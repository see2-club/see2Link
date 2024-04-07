import React from 'react'

interface ViewModeProps {
  mode: 'edit_mode' | 'view_mode'
  editor: string
}

function UserHoldCryptoCard({
  data,
  viewMode = {
    mode: 'view_mode',
    editor: 'editor',
  },
}) {
  const { NFTName, quantity, currentPrice, imageUrl } = data
  const totalValue = quantity * currentPrice

  const renderInfo = () => {
    if (viewMode.mode !== 'view_mode') {
      return null
    }
    return (
      <div className='flex-0'>
        <div className='dropdown dropdown-end dropdown-top'>
          <div className='flex space-x-1'>
            <button className='btn btn-square btn-ghost' aria-label='button component'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='size-6 shrink-0 stroke-current'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderEditor = () => {
    if (viewMode.mode !== 'edit_mode') {
      return null
    }
    return (
      <div className='flex-0'>
        <div className='dropdown dropdown-end dropdown-top'>
          <div>
            <div className='flex space-x-1'>
              <button className='btn btn-square btn-ghost' aria-label='button component'>
                <svg
                  width='32'
                  height='32'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block size-8 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className='dropdown-content py-2'>
            <div className='bg-neutral-focus card compact w-72 rounded-box text-neutral-content shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title font-extrabold capitalize'>button component</h2>
                <p className='text-sm text-neutral-content text-opacity-80'>
                  {' '}
                  Buttons come in various shapes, colors and sizes{' '}
                </p>
                <div className='mt-4 flex justify-end'>
                  <a
                    target='blank'
                    href='https://daisyui.com/components/button'
                    className='btn btn-primary btn-sm xl:btn-md'
                  >
                    {' '}
                    See component{' '}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                <h2 className=' text-md join-item flex font-extrabold md:text-2xl'>{NFTName}</h2>
                <svg
                  className=' join-item w-4 md:w-8'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.46615 12.8671L2.63281 12.4671C2.46615 12.4338 2.33281 12.3476 2.23281 12.2085C2.13281 12.0698 2.09392 11.9171 2.11615 11.7505L2.29948 9.86713L1.04948 8.4338C0.938368 8.31157 0.882812 8.16713 0.882812 8.00046C0.882812 7.8338 0.938368 7.68935 1.04948 7.56713L2.29948 6.1338L2.11615 4.25046C2.09392 4.0838 2.13281 3.93113 2.23281 3.79246C2.33281 3.65335 2.46615 3.56713 2.63281 3.5338L4.46615 3.1338L5.43281 1.50046C5.5217 1.35602 5.64392 1.26157 5.79948 1.21713C5.95503 1.17269 6.11059 1.17824 6.26615 1.2338L7.99948 1.96713L9.73281 1.2338C9.88837 1.17824 10.0439 1.17269 10.1995 1.21713C10.355 1.26157 10.4773 1.35602 10.5661 1.50046L11.5328 3.1338L13.3661 3.5338C13.5328 3.56713 13.6661 3.65335 13.7661 3.79246C13.8661 3.93113 13.905 4.0838 13.8828 4.25046L13.6995 6.1338L14.9495 7.56713C15.0606 7.68935 15.1161 7.8338 15.1161 8.00046C15.1161 8.16713 15.0606 8.31157 14.9495 8.4338L13.6995 9.86713L13.8828 11.7505C13.905 11.9171 13.8661 12.0698 13.7661 12.2085C13.6661 12.3476 13.5328 12.4338 13.3661 12.4671L11.5328 12.8671L10.5661 14.5005C10.4773 14.6449 10.355 14.7394 10.1995 14.7838C10.0439 14.8282 9.88837 14.8227 9.73281 14.7671L7.99948 14.0338L6.26615 14.7671C6.11059 14.8227 5.95503 14.8282 5.79948 14.7838C5.64392 14.7394 5.5217 14.6449 5.43281 14.5005L4.46615 12.8671ZM6.83281 9.90046C6.95504 10.0227 7.11059 10.0838 7.29948 10.0838C7.48837 10.0838 7.64392 10.0227 7.76615 9.90046L10.5995 7.06713C10.7328 6.9338 10.7995 6.77535 10.7995 6.5918C10.7995 6.40869 10.7328 6.25046 10.5995 6.11713C10.4661 5.9838 10.3079 5.91713 10.1248 5.91713C9.94126 5.91713 9.78281 5.9838 9.64948 6.11713L7.29948 8.46713L6.33281 7.51713C6.19948 7.39491 6.04126 7.33646 5.85815 7.3418C5.67459 7.34757 5.5217 7.41157 5.39948 7.5338C5.27726 7.65602 5.21615 7.81157 5.21615 8.00046C5.21615 8.18935 5.27726 8.34491 5.39948 8.46713L6.83281 9.90046Z'
                    fill='#1A96F0'
                  />
                </svg>
                <p className='md:text-md flex text-sm font-medium'>Holdrer</p>
              </div>
              <h2 className='text-md flex font-extrabold md:text-2xl'>x{quantity}</h2>
            </div>
          </div>
          {/* {renderInfo()} */}
          {renderEditor()}
        </div>
      </summary>
      <div className='collapse-content mt-2 bg-secondary'>
        <div className='grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
          {nfts.map((nft) => (
            <NFTCard key={nft.tokenId} tokenId={nft.tokenId} name={nft.name} imageUrl={nft.imageUrl} />
          ))}
        </div>
      </div>
    </details>
  )
}

interface NFTCardProps {
  tokenId: number
  name: string
  imageUrl: string
}
const nfts = [
  {
    tokenId: 5678,
    name: 'NFT Name 1',
    imageUrl: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  },
  {
    tokenId: 5679,
    name: 'NFT Name 2',
    imageUrl: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  },
  {
    tokenId: 5678,
    name: 'NFT Name 1',
    imageUrl: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  },
  {
    tokenId: 5679,
    name: 'NFT Name 2',
    imageUrl: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  },
  // 更多的 NFTs...
]

const NFTCard: React.FC<NFTCardProps> = ({ tokenId, name, imageUrl }) => {
  return (
    <div className='card w-full bg-base-100 shadow-xl'>
      <figure className=' aspect-square w-full overflow-hidden'>
        <img src={imageUrl} className='size-full object-cover' alt={`NFT ${name} Image`} />
      </figure>
      <div className='card-body px-4 py-2'>
        <div className='badge badge-secondary'>{name}</div>
        <h2 className='card-title'>#{tokenId}</h2>
      </div>
    </div>
  )
}
export default UserHoldCryptoCard
