import * as React from "react"
import clsx from "clsx"
type InputProps = React.ComponentProps<"input"> & {
    label?: string
    error?: string
    icon?: React.ReactNode,
    onIconClick?: () => void
}
export default function Input({ label, error, className, type, icon, onIconClick, ...props }: InputProps) {
    return (
        <div className="relative">
            {label && <label className="text-[14px] text-[#45474A] mb-[6px]" data-slot="label">{label}</label>}
            <div className="relative">
                <input
                    type={type}
                    data-slot="input"
                    className={clsx(className,
                        'text-[16px] text-[#1A1C1E] border border-[#D9D9D9] rounded-lg px-3 h-10 outline-none',
                        error && 'border-[#E74247]'
                    )}
                    {...props}
                />
                {icon && <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer h-8 " onClick={onIconClick}>{icon}</span>}
            </div>
            {error && <p className="text-[#E74247] text-[14px] absolute">{error}</p>}
        </div>
    )
}