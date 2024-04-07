import React from 'react'

function UserCard({
  children,
  data,
}: {
  children?: React.ReactNode
  data: { imageUrl: string; title: string; quantity: number }
}) {
  const { imageUrl, title, quantity } = data
  return (
    <details className='collapse [&_summary]:bg-neutral [&_summary]:open:bg-secondary'>
      <summary className='rounded-2xl'>
        <div className='flex w-full items-center px-4 py-3 text-secondary-content shadow-xl'>
          <div className='avatar'>
            <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
              <img src={imageUrl} />
            </div>
          </div>
          <div className='w-full flex-col px-2'>
            <div className='flex flex-row justify-between px-2'>
              <div className='join items-center justify-center gap-2'>
                <h2 className=' text-md join-item flex font-extrabold md:text-2xl'>{title}</h2>
              </div>
              <h2 className='text-md flex font-extrabold md:text-2xl'>{quantity}</h2>
            </div>
          </div>
        </div>
      </summary>
      {children && (
        <div className='collapse-content mt-2 bg-secondary'>
          <div className='pt-4'>{children}</div>
        </div>
      )}
    </details>
  )
}

export default UserCard
