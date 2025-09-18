import type { Ref } from "react"

export function Layout({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode
  ref: Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="grow relative" tabIndex={0} ref={ref} {...props}>
      {children}
    </div>
  )
}
