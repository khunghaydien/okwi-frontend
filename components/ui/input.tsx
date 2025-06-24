import * as React from "react"
import clsx from "clsx"
type InputProps = React.ComponentProps<"input"> & {
    label?: string
    error?: boolean,
    errorMessage?: string,
    icon?: React.ReactNode,
    onIconClick?: () => void
}
export default function Input({ label, error, className, type, icon, onIconClick, errorMessage, ...props }: InputProps) {
    return (
        <div className={clsx("relative",className)}>
            {label && <label className="text-[14px] text-[#45474A] mb-[6px]" data-slot="label">{label}</label>}
            <div className="relative">
                <input
                    type={type}
                    data-slot="input"
                    className={clsx(
                        'w-full text-[16px] text-[#1A1C1E] border border-[#D9D9D9] rounded-lg px-3 h-10 outline-none',
                        error && 'border-[#E74247]'
                    )}
                    {...props}
                />
                {icon && <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={onIconClick}>{icon}</span>}
            </div>
            {error && <p className="error-message-scroll text-[#E74247] text-[14px] absolute">{errorMessage}</p>}
        </div>
    )
}