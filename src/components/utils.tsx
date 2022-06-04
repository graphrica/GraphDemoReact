export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const formatAddress = (address: string | undefined, truncateAmount = 4) =>
  address ? (
    <span className="inline-flex items-center">
      {address.slice(0, 2 + truncateAmount)}
      <span style={{ letterSpacing: '0px' }} className="inline-block">
        ...
      </span>
      {address.slice(-truncateAmount, address.length)}
    </span>
  ) : (
    ''
  )
