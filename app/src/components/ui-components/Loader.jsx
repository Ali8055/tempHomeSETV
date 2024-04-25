import { Fragment } from 'react'

// ==============================|| LOADER ||============================== //
const Loader = () => (
  <Fragment>
    {/* Tailwind CSS equivalent */}
    <div className="fixed top-0 left-0 z-50 w-full">
      {/* <LinearProgress color="primary" /> */}
      {/* <LoginScreenSkeleton /> */}
      <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </Fragment>
)

export default Loader
