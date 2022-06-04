export const Button = ({ children, onClick, large }: any) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
      inline-flex items-center  border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      
      ${large ? 'py-4 px-3' : 'py-2 px-3'}
      `}
    >
      {children}
    </button>
  )
}
