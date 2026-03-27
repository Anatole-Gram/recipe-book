import React from "react";
import styles from "./expandable-card.module.scss"

type ExpandableCardProps = {
    children: React.ReactNode;
    clampLines?: number;
    className?: string;
}

export default function ExpandableCard(props: ExpandableCardProps) {

    const { children, className, clampLines = 3 } = props;

    const contentRef = React.useRef<HTMLDivElement | null>(null);

    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [collapsedHeight, setCollapsedHeight] = React.useState<number>(0);
    const [hasOverflow, setHasOverfow] = React.useState<boolean>(false);
    

    // Получаем фактическую высоту строки из вычисленных стилей
    const measureLineHeight = React.useCallback(() => {
        const el = contentRef.current;
        if(!el) return 0;

        const cs = window.getComputedStyle(el);
        let lh = parseFloat(cs.lineHeight);
        if(isNaN(lh) || !isFinite(lh)) {
            const tmp =  document.createElement('span');
            tmp.textContent = 'T';
            el.appendChild(tmp);
            const height = tmp.getBoundingClientRect().height;
            el.removeChild(tmp);
            lh = height || 20
        };
        return lh;
    }, [])


    // Устанавливаем высоту для свернутого состояния = lineHeight * clampLines
    const recalcCollapsedHeight = React.useCallback(() => {
        const lh = measureLineHeight();
        if(!lh) return;
        setCollapsedHeight(Math.ceil(lh*clampLines))
    }, [clampLines, measureLineHeight]);


    // Проверяем, есть ли переполнение в СВЕРНУТОМ состоянии
    const checkOverflow = React.useCallback(() => {
        const el = contentRef.current;
        if(!el) return;

        // Временно ограничиваем высоту, чтобы корректно оценить переполнение
        const prevMaxHeight = el.style.maxHeight;
        const prevOverflow = el.style.overflow;

        el.style.maxHeight = `${collapsedHeight || 0}px`;
        el.style.overflow = 'hidden';

        const overflow = el.scrollHeight > el.clientHeight + 1; // +1 — на случай субпикселей
        setHasOverfow(overflow);

        // Возвращаем стили (фактическое состояние управляется через expanded)
        el.style.maxHeight = prevMaxHeight;
        el.style.overflow = prevOverflow;

    }, [collapsedHeight])


    // Пересчитать при монтировании и при изменении шрифта/размера
    React.useLayoutEffect(() => {
        recalcCollapsedHeight()
    }, [recalcCollapsedHeight]);


    React.useEffect(() => {
        checkOverflow();
    }, [collapsedHeight, children, checkOverflow]);


    // Следим за ресайзом карточки и окна
    React.useEffect(() => {
        const el = contentRef.current;
        if(!el) return;

        let ro: ResizeObserver | null = null;
        if("ResizeObserver" in window) {
            ro = new ResizeObserver(() => {
                recalcCollapsedHeight();
                // Небольшая задержка, чтобы дождаться применения стилей
                requestAnimationFrame(() => checkOverflow());
            });
            ro.observe(el);
        };

        const onWinResize = () => {
            recalcCollapsedHeight();
            requestAnimationFrame(() => checkOverflow());
        };
        window.addEventListener("resize", onWinResize);

        return () => {
            ro?.disconnect();
            window.removeEventListener("resize", onWinResize);
        };
    }, [recalcCollapsedHeight, checkOverflow] );

    // Инлайновые стили для плавного раскрытия
    const contenStyle = React.useMemo(() => {

        if(expanded) {
            return {
                maxHeight: "1000vh", // большой предел для плавной анимации
                overflow: "visible",
            };
        };
        return {
            maxHeight: collapsedHeight ? `${collapsedHeight}px` : undefined,
            overflow: "hidden",
        };
    }, [expanded, collapsedHeight])
    
    return (
        <div>
            <div
                ref={contentRef} 
                style={{...contenStyle}}
                aria-expanded={expanded}
                className={`${styles.card} ${className}`}>

                    {children}

            </div>

            {hasOverflow && (
                <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.stopPropagation(); return setExpanded((prev) => !prev)}}
                    > 
                        показать весь текст 
                </button>
            )}

        </div>
    )
}