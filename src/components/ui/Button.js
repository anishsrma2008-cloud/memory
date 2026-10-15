export function Button(props = {}) {
  const { children, type = 'button', ...buttonProps } = props
  return <button type={type} {...buttonProps}>{children}</button>
}

export default Button

