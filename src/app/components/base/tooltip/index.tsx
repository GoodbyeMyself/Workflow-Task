'use client'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { useBoolean } from 'ahooks'
import type { OffsetOptions, Placement } from '@floating-ui/react'
import { RiQuestionLine } from '@remixicon/react'
import cn from '@/utils/classnames'
import { PortalToFollowElem, PortalToFollowElemContent, PortalToFollowElemTrigger } from '@/app/components/base/portal-to-follow-elem'
export type TooltipProps = {
    position?: Placement
    triggerMethod?: 'hover' | 'click'
    triggerClassName?: string
    triggerTestId?: string
    disabled?: boolean
    popupContent?: React.ReactNode
    children?: React.ReactNode
    popupClassName?: string
    noDecoration?: boolean
    offset?: OffsetOptions
    needsDelay?: boolean
    asChild?: boolean
}

const Tooltip: FC<TooltipProps> = ({
    position = 'top',
    triggerMethod = 'hover',
    triggerClassName,
    triggerTestId,
    disabled = false,
    popupContent,
    children,
    popupClassName,
    noDecoration,
    offset,
    asChild = true,
    needsDelay = false,
}) => {
    const [open, setOpen] = useState(false)
    const [isHoverPopup, {
        setTrue: setHoverPopup,
        setFalse: setNotHoverPopup,
    }] = useBoolean(false)

    const isHoverPopupRef = useRef(isHoverPopup)
    useEffect(() => {
        isHoverPopupRef.current = isHoverPopup
    }, [isHoverPopup])

    const [isHoverTrigger, {
        setTrue: setHoverTrigger,
        setFalse: setNotHoverTrigger,
    }] = useBoolean(false)

    const isHoverTriggerRef = useRef(isHoverTrigger)
    useEffect(() => {
        isHoverTriggerRef.current = isHoverTrigger
    }, [isHoverTrigger])

    const handleLeave = (isTrigger: boolean) => {
        if (isTrigger)
            setNotHoverTrigger()

        else
            setNotHoverPopup()

        // give time to move to the popup
        if (needsDelay) {
            setTimeout(() => {
                if (!isHoverPopupRef.current && !isHoverTriggerRef.current)
                    setOpen(false)
            }, 500)
        }
        else {
            setOpen(false)
        }
    }

    return (
        <PortalToFollowElem
            open={disabled ? false : open}
            onOpenChange={setOpen}
            placement={position}
            offset={offset ?? 8}
        >
            <PortalToFollowElemTrigger
                onClick={() => triggerMethod === 'click' && setOpen(v => !v)}
                onMouseEnter={() => {
                    if (triggerMethod === 'hover') {
                        setHoverTrigger()
                        setOpen(true)
                    }
                }}
                onMouseLeave={() => triggerMethod === 'hover' && handleLeave(true)}
                asChild={asChild}
                className={!asChild ? triggerClassName : ''}
            >
                {children || <div data-testid={triggerTestId} className={triggerClassName || 'h-3.5 w-3.5 shrink-0 p-[1px]'}><RiQuestionLine className='h-full w-full text-text-quaternary hover:text-text-tertiary' /></div>}
            </PortalToFollowElemTrigger>
            <PortalToFollowElemContent
                className="z-[9999]"
            >
                {popupContent && (<div
                    className={cn(
                        !noDecoration && 'system-xs-regular relative break-words rounded-md bg-components-panel-bg px-3 py-2 text-text-tertiary shadow-lg',
                        popupClassName,
                    )}
                    onMouseEnter={() => triggerMethod === 'hover' && setHoverPopup()}
                    onMouseLeave={() => triggerMethod === 'hover' && handleLeave(false)}
                >
                    {popupContent}
                </div>)}
            </PortalToFollowElemContent>
        </PortalToFollowElem>
    )
}

export default React.memo(Tooltip)
