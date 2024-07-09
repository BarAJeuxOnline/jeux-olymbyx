export function getSlotChildrenText(children: any) {
  return children.map((node: any) => {
    if (!node.children || typeof node.children === 'string')
      return node.children || ''
    else if (Array.isArray(node.children))
      return getSlotChildrenText(node.children)
    else if (node.children.default)
      return getSlotChildrenText(node.children.default())
  }).join('')
}

export function useAriaLabel(props: any, slotsNames: string[] = ['logo']): ComputedRef<string> {
  const slots = useSlots()
  return computed(() => {
    for (const slotName of slotsNames) {
      if (slots[slotName])
        return getSlotChildrenText(slots[slotName]?.())
    }

    return props.title.trim() || ''
  })
}
