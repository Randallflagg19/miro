export function Overlay({
  onClick,
  onMouseDown,
  onMouseUp,
}: {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      className="absolute inset-0"
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    ></div>
  )
}
