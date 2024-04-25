
export const Button= ({ component: Component }) => {
  return (
    <div className="backdrop-blur-sm bg-gray-500/30 rounded p-2 m-1 text-black h-8">
      <button>
        <Component />
      </button>
    </div>
  )
}
