"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import PolygonIcon from "@/public/icons/polygon-icon";
import clsx from "clsx";
export function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}
function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  error = false,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  error?: boolean;
}) {
  return (
    <div className="relative">
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        data-size={size}
        className={clsx(
          "text-[16px] text-[#1A1C1E] border border-[#D9D9D9] rounded-lg px-3 h-10 outline-none text-left",
          className,
          error && "border-[#E74247]"
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon
          asChild
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          <PolygonIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </div>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={clsx(
            className,
            "bg-white shadow-lg rounded-lg p-2 data-[side=bottom]:animate-slide-up data-[side=top]:animate-slide-down data-[side=left]:animate-slide-left data-[side=right]:animate-slide-right"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={clsx(className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={clsx(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <PolygonIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={clsx(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <PolygonIcon />
    </SelectPrimitive.ScrollDownButton>
  );
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function CommonSelect({
  options,
  value,
  defaultValue,
  placeholder = "Select an option",
  onValueChange,
  disabled = false,
  triggerClassName,
  contentClassName,
}: CustomSelectProps) {
  const [selectedValue, setSelectedValue] = React.useState(
    value || defaultValue || ""
  );

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <Select
      value={selectedValue}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={clsx(
          "justify-between bg-white border border-gray-200 hover:border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 outline-none",
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder}>
          {selectedOption?.label || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className={clsx(
          "bg-white border border-gray-200 shadow-lg rounded-md p-1 outline-none focus:outline-none",
          contentClassName
        )}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={clsx(
              "relative flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-sm outline-none focus:outline-none data-[state=checked]:bg-transparent data-[highlighted]:outline-none",
              selectedValue === option.value &&
                "bg-rose-100 text-rose-800 hover:bg-rose-100 focus:bg-rose-100"
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span>{option.label}</span>
              {selectedValue === option.value && (
                <span className="text-rose-600">✓</span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
