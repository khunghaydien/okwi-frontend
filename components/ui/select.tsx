"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import PolygonIcon from "@/public/icons/polygon-icon";
import clsx from "clsx";
function SingleSelect({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
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
          className,
          "text-[16px] text-[#1A1C1E] w-full border border-[#D9D9D9] rounded-lg px-3 h-10 outline-none text-left",
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
        <SelectPrimitive.Viewport className="bg-white shadow-lg rounded-lg p-2 data-[side=bottom]:animate-slide-up data-[side=top]:animate-slide-down data-[side=left]:animate-slide-left data-[side=right]:animate-slide-right">
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

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={clsx(
        "bg-border pointer-events-none -mx-1 my-1 h-px",
        className
      )}
      {...props}
    />
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
export {
  SingleSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  label?: string;
  error?: string;
  data?: { value: string; label: string }[];
  placeholder?: string;
};

export default function Select({
  label,
  error,
  data,
  placeholder,
}: SelectProps) {
  return (
    <div className="relative">
      {label && (
        <label
          className="text-[14px] text-[#45474A] mb-[6px]"
          data-slot="label"
        >
          {label}
        </label>
      )}
      <SingleSelect>
        <SelectTrigger error={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data && data.length > 0 ? (
            data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="" disabled>
              No options
            </SelectItem>
          )}
        </SelectContent>
      </SingleSelect>
      {error && <p className="text-[#E74247] text-[14px] absolute">{error}</p>}
    </div>
  );
}
