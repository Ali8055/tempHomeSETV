import { Suspense } from 'react'
import Loader from './Loader'

// Define Loadable HOC to dynamically load a component
const Loadable = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )

  // Assign display name to the wrapped component for better debugging
  //   WrappedComponent.displayName = `Loadable(${Component.displayName || Component.name})`

  return WrappedComponent
}

export default Loadable
