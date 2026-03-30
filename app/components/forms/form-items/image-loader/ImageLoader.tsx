import React from "react";
import styles from "./image-loader.module.scss";

interface CropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

type HandlePosition = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface ImageLoaderProps {
    onCrop: (blob: Blob) => void;
    close: () => void;
}

export default function ImageLoader({ onCrop }: ImageLoaderProps) {


    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const overlayCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [imgUrl, setImgUrl] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const img = React.useRef<HTMLImageElement | null>(null);
    
    // Размеры canvas
    const [canvasSize, setCanvasSize] = React.useState({ width: 300, height: 400 });
    
    // Параметры отображения изображения
    const imageParams = React.useRef<{
        x: number;
        y: number;
        width: number;
        height: number;
        scale: number;
    }>({ x: 0, y: 0, width: 0, height: 0, scale: 1 });
    
    // Область обрезки (в координатах canvas)
    const [cropArea, setCropArea] = React.useState<CropArea | null>(null);
    
    // Состояние перетаскивания
    const [isDragging, setIsDragging] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState<HandlePosition | null>(null);
    const [dragStart, setDragStart] = React.useState<{ x: number; y: number } | null>(null);
    const [cropStart, setCropStart] = React.useState<CropArea | null>(null);

    // Размеры ручек изменения размера (адаптивные)
    const getHandleSize = () => Math.max(10, canvasSize.width / 30);
    const MIN_CROP_SIZE = 20;

    // Определение размеров canvas при загрузке и изменении размера окна
    React.useEffect(() => {
        const updateCanvasSize = () => {
            const container = containerRef.current;
            if (!container) return;

            const maxWidth = Math.min(window.innerWidth - 40, 400);
            const maxHeight = Math.min(window.innerHeight - 300, 500);
            
            const aspectRatio = 3 / 4;
            let width = maxWidth;
            let height = width / aspectRatio;

            if (height > maxHeight) {
                height = maxHeight;
                width = height * aspectRatio;
            }

            setCanvasSize({ width: Math.floor(width), height: Math.floor(height) });
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    // Очистка ресурсов при размонтировании
    React.useEffect(() => {
        return () => {
            if (imgUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(imgUrl);
            }
        };
    }, [imgUrl]);

    // Загружаем и рисуем изображение
    React.useEffect(() => {
        if (!imgUrl) {
            const ctx = canvasRef.current?.getContext('2d');
            const overlayCtx = overlayCanvasRef.current?.getContext('2d');
            if (ctx && canvasRef.current) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            if (overlayCtx && overlayCanvasRef.current) {
                overlayCtx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
            }
            img.current = null;
            setCropArea(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        const image = new Image();
        img.current = image;
        
        image.onload = () => {
            const canvas = canvasRef.current;
            const overlayCanvas = overlayCanvasRef.current;
            if (!canvas || !overlayCanvas) return;
            
            const ctx = canvas.getContext('2d');
            const overlayCtx = overlayCanvas.getContext('2d');
            if (!ctx || !overlayCtx) return;

            // Очистка
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

            // Подгоняем изображение под размер канваса, сохраняя пропорции
            const cw = canvas.width;
            const ch = canvas.height;
            const scale = Math.min(cw / image.naturalWidth, ch / image.naturalHeight);
            const w = image.naturalWidth * scale;
            const h = image.naturalHeight * scale;
            const x = (cw - w) / 2;
            const y = (ch - h) / 2;

            ctx.drawImage(image, x, y, w, h);

            // Сохраняем параметры изображения
            imageParams.current = { x, y, width: w, height: h, scale };

            // Устанавливаем начальную квадратную область обрезки по центру изображения
            const initialCropSize = Math.min(w, h) * 0.6;
            const initialCrop: CropArea = {
                x: x + (w - initialCropSize) / 2,
                y: y + (h - initialCropSize) / 2,
                width: initialCropSize,
                height: initialCropSize // Квадрат!
            };
            setCropArea(initialCrop);
            
            setIsLoading(false);
        };
        
        image.onerror = () => {
            setError('Не удалось загрузить изображение');
            setIsLoading(false);
        };
        
        image.src = imgUrl;
    }, [imgUrl, canvasSize]);

    // Отрисовка области обрезки
    React.useEffect(() => {
        if (!cropArea) return;

        const overlayCanvas = overlayCanvasRef.current;
        if (!overlayCanvas) return;
        
        const ctx = overlayCanvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        // Затемненная область вне выделения
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        // Прозрачная область выделения
        ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

        // Рамка выделения
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = Math.max(2, canvasSize.width / 150);
        ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

        // Рисуем ручки изменения размера
        const handles = getHandlePositions(cropArea);
        const handleSize = getHandleSize();
        ctx.fillStyle = '#fff';
        
        Object.values(handles).forEach(handle => {
            ctx.fillRect(
                handle.x - handleSize / 2,
                handle.y - handleSize / 2,
                handleSize,
                handleSize
            );
        });
    }, [cropArea, canvasSize]);

    // Получение позиций ручек
    const getHandlePositions = (area: CropArea) => {
        return {
            nw: { x: area.x, y: area.y },
            n:  { x: area.x + area.width / 2, y: area.y },
            ne: { x: area.x + area.width, y: area.y },
            e:  { x: area.x + area.width, y: area.y + area.height / 2 },
            se: { x: area.x + area.width, y: area.y + area.height },
            s:  { x: area.x + area.width / 2, y: area.y + area.height },
            sw: { x: area.x, y: area.y + area.height },
            w:  { x: area.x, y: area.y + area.height / 2 }
        };
    };

    // Проверка попадания в ручку
    const getHandleAtPosition = (x: number, y: number, area: CropArea): HandlePosition | null => {
        const handles = getHandlePositions(area);
        const handleSize = getHandleSize();
        
        for (const [position, handle] of Object.entries(handles)) {
            if (
                x >= handle.x - handleSize &&
                x <= handle.x + handleSize &&
                y >= handle.y - handleSize &&
                y <= handle.y + handleSize
            ) {
                return position as HandlePosition;
            }
        }
        return null;
    };

    // Проверка попадания в область обрезки
    const isInCropArea = (x: number, y: number, area: CropArea): boolean => {
        return (
            x >= area.x &&
            x <= area.x + area.width &&
            y >= area.y &&
            y <= area.y + area.height
        );
    };

    // Получение координат из события (mouse или touch)
    const getEventCoords = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = overlayCanvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        
        if ('touches' in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    // Обработка начала перетаскивания
    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (!cropArea) return;

        const coords = getEventCoords(e);
        
        // Проверяем, попали ли в ручку изменения размера
        const handle = getHandleAtPosition(coords.x, coords.y, cropArea);
        if (handle) {
            setIsResizing(handle);
            setDragStart(coords);
            setCropStart({ ...cropArea });
            return;
        }

        // Проверяем, попали ли в область обрезки
        if (isInCropArea(coords.x, coords.y, cropArea)) {
            setIsDragging(true);
            setDragStart(coords);
            setCropStart({ ...cropArea });
            return;
        }
    };

    // Обработка перемещения
    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!cropArea || !cropStart || !dragStart) return;

        const coords = getEventCoords(e);
        const dx = coords.x - dragStart.x;
        const dy = coords.y - dragStart.y;

        const img = imageParams.current;
        const newCrop = { ...cropArea };

        if (isDragging) {
            // Перемещение области
            newCrop.x = Math.max(img.x, Math.min(img.x + img.width - cropArea.width, cropStart.x + dx));
            newCrop.y = Math.max(img.y, Math.min(img.y + img.height - cropArea.height, cropStart.y + dy));
        } else if (isResizing) {
            // Изменение размера с сохранением квадратной формы
            const maxDelta = Math.max(dx, dy);
            const minDelta = Math.min(dx, dy);
            
            switch (isResizing) {
                case 'se':
                    const newSizeSE = Math.max(MIN_CROP_SIZE, Math.min(
                        img.x + img.width - newCrop.x,
                        img.y + img.height - newCrop.y,
                        cropStart.width + maxDelta
                    ));
                    newCrop.width = newSizeSE;
                    newCrop.height = newSizeSE;
                    break;
                    
                case 'sw':
                    const newSizeSW = Math.max(MIN_CROP_SIZE, cropStart.width - minDelta);
                    const newXSW = cropStart.x + (cropStart.width - newSizeSW);
                    if (newXSW >= img.x && newXSW + newSizeSW <= img.x + img.width) {
                        newCrop.x = newXSW;
                        newCrop.width = newSizeSW;
                        newCrop.height = newSizeSW;
                    }
                    break;
                    
                case 'ne':
                    const newSizeNE = Math.max(MIN_CROP_SIZE, cropStart.width - minDelta);
                    const newYNE = cropStart.y + (cropStart.height - newSizeNE);
                    if (newYNE >= img.y && newYNE + newSizeNE <= img.y + img.height) {
                        newCrop.y = newYNE;
                        newCrop.width = newSizeNE;
                        newCrop.height = newSizeNE;
                    }
                    break;
                    
                case 'nw':
                    const newSizeNW = Math.max(MIN_CROP_SIZE, cropStart.width - minDelta);
                    const newXNW = cropStart.x + (cropStart.width - newSizeNW);
                    const newYNW = cropStart.y + (cropStart.height - newSizeNW);
                    
                    if (newXNW >= img.x && newXNW + newSizeNW <= img.x + img.width) {
                        newCrop.x = newXNW;
                        newCrop.width = newSizeNW;
                    }
                    if (newYNW >= img.y && newYNW + newSizeNW <= img.y + img.height) {
                        newCrop.y = newYNW;
                        newCrop.height = newSizeNW;
                    }
                    break;
                    
                case 'n':
                    const newSizeN = Math.max(MIN_CROP_SIZE, cropStart.height - dy);
                    const newYN = cropStart.y + (cropStart.height - newSizeN);
                    if (newYN >= img.y && newYN + newSizeN <= img.y + img.height) {
                        newCrop.y = newYN;
                        newCrop.width = newSizeN;
                        newCrop.height = newSizeN;
                    }
                    break;
                    
                case 's':
                    const newSizeS = Math.max(MIN_CROP_SIZE, Math.min(
                        img.y + img.height - newCrop.y,
                        cropStart.height + dy
                    ));
                    newCrop.width = newSizeS;
                    newCrop.height = newSizeS;
                    break;
                    
                case 'e':
                    const newSizeE = Math.max(MIN_CROP_SIZE, Math.min(
                        img.x + img.width - newCrop.x,
                        cropStart.width + dx
                    ));
                    newCrop.width = newSizeE;
                    newCrop.height = newSizeE;
                    break;
                    
                case 'w':
                    const newSizeW = Math.max(MIN_CROP_SIZE, cropStart.width - dx);
                    const newXW = cropStart.x + (cropStart.width - newSizeW);
                    if (newXW >= img.x && newXW + newSizeW <= img.x + img.width) {
                        newCrop.x = newXW;
                        newCrop.width = newSizeW;
                        newCrop.height = newSizeW;
                    }
                    break;
            }
        }

        setCropArea(newCrop);
    };

    // Обработка окончания перетаскивания
    const handleEnd = () => {
        setIsDragging(false);
        setIsResizing(null);
        setDragStart(null);
        setCropStart(null);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            setError('Пожалуйста, выберите изображение');
            return;
        }

        if (imgUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(imgUrl);
        }
        
        const url = URL.createObjectURL(file);
        setImgUrl(url);
    };


    // Сохранение обрезанного изображения
    const saveCroppedImage = () => {
        if (!cropArea || !img.current) return;

        const imgParams = imageParams.current;
        
        // Перевод координат из canvas в координаты исходного изображения
        const scaleX = img.current.naturalWidth / imgParams.width;
        const scaleY = img.current.naturalHeight / imgParams.height;
        
        const sourceX = (cropArea.x - imgParams.x) * scaleX;
        const sourceY = (cropArea.y - imgParams.y) * scaleY;
        const sourceWidth = cropArea.width * scaleX;
        const sourceHeight = cropArea.height * scaleY;

        // Создаем временный canvas для обрезки
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = sourceWidth;
        tempCanvas.height = sourceHeight;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        // Рисуем обрезанную часть
        tempCtx.drawImage(
            img.current,
            sourceX, sourceY, sourceWidth, sourceHeight,
            0, 0, sourceWidth, sourceHeight
        );

        // Получаем blob и отправляем родителю
        tempCanvas.toBlob((blob) => {
            if (blob) {
                onCrop(blob);
            }
        }, 'image/png');
    };

    // Изменение курсора в зависимости от позиции
    const getCursor = () => {
        if (isResizing) {
            const cursors: Record<HandlePosition, string> = {
                nw: 'nw-resize',
                n: 'n-resize',
                ne: 'ne-resize',
                e: 'e-resize',
                se: 'se-resize',
                s: 's-resize',
                sw: 'sw-resize',
                w: 'w-resize'
            };
            return cursors[isResizing];
        }
        if (isDragging) return 'move';
        return 'default';
    };

    return (
        <div className={styles.wrapper} ref={containerRef}>

                <label className={`main-btn--black ${styles.fileLabel} ${styles.btn}`}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onFileChange}
                        disabled={isLoading}
                        className={styles.fileInput}
                    />
                        {isLoading ? 'Загрузка...' : 'Выбрать фото'}
                </label>
                
            
            {error && <p className={styles.error}>{error}</p>}
            
            <div className={styles.canvasContainer}>
                <canvas 
                    ref={canvasRef} 
                    width={canvasSize.width} 
                    height={canvasSize.height}
                    className={styles.canvas}
                />
                <canvas 
                    ref={overlayCanvasRef} 
                    width={canvasSize.width} 
                    height={canvasSize.height}
                    className={styles.overlayCanvas}
                    style={{ cursor: getCursor() }}
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                />
            </div>
                            <button 
                    type="button" 
                    onClick={close} 
                    disabled={isLoading}
                    className={`main-btn--black`}
                >
                    отменить
                </button>

                <button 
                    type="button" 
                    onClick={saveCroppedImage} 
                    disabled={isLoading}
                    className={`main-btn--black`}
                >
                    сохранить
                </button>
        </div>
    );
}