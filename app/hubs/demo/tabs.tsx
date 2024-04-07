'use client'
import { useEffect, useState, Fragment } from 'react'
import UserHoldCryptoCard from '@/components/hub/page/userHoldCryptoCard'
import UserHoldNFTCard from '@/components/hub/page/userHoldNFTCard'
import UserCard from '@/components/hub/page/UserCard'

// 假資料
interface ValidationInfo {
  firstValidationTime: string
  latestValidationTime: string
  fromUserWallet: string //來自使用者的錢包
  addedTime: string //資料加入時間
  validationRecords: any[] // 驗證紀錄
  de_identification: boolean
  dataUsage: 'invisible' | 'private' | 'de_identification' | 'public'
}

interface NFT {
  tokenId: string // NFT 的唯一識別碼
  tokenUrl: number // NFT 的 URL
  name: string // NFT 的名稱
  description: string // NFT 的描述
  image: string // NFT 的圖片 URL
  owner: string // NFT 的擁有者的地址
  creator: string // NFT 的創建者的地址
  creationTime: string // NFT 的創建時間
  blockchain: string // NFT 所在的區塊鏈
  contractAddress: string // NFT 所在的智能合約地址
  collectionName?: string // NFT 的系列名稱，如果有的話
}

interface NFTData extends ValidationInfo {
  NFTName: string
  blockchain: string
  quantity: number
  imageUrl: string
  NFTs: any[]
}

interface NFTInfo {
  name: string
  tokenID: string
  tokenUrl: number
  image: string
}

interface UserNFTCollection extends ValidationInfo {
  collectionName: string
  blockchain: string
  totalQuantity: number
  collectionImage: string
  NFTs: NFTInfo[]
}

interface CryptoData extends ValidationInfo {
  tokenName: string
  symbol: string
  blockchain: string
  quantity: number
  currentPrice: number
  imageUrl: string
}

const fakeCryptoData: CryptoData = {
  tokenName: 'SOL',
  blockchain: 'Solana',
  quantity: 10,
  currentPrice: 60000,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  firstValidationTime: '2021-10-10',
  latestValidationTime: '2021-10-11',
  fromUserWallet: '0x1234567890', //來自使用者的錢包
  addedTime: '2021-10-10', //資料加入時間
  validationRecords: [], // 驗證紀錄
  de_identification: false,
  dataUsage: 'public',
  symbol: 'SOL',
}

const userCryptoData = {
  cryptoTokens: [
    {
      symbol: 'BTC',
      tokenName: 'Bitcoin',
      blockchain: 'Bitcoin',
      quantity: 3,
      currentPrice: 60000,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png',
      firstValidationTime: '2021-10-10',
      latestValidationTime: '2028-10-11',
      fromUserWallet: '0x1234567890', //來自使用者的錢包
      addedTime: '2021-10-10', //資料加入時間
      validationRecords: [], // 驗證紀錄
      de_identification: false,
      usage: 'public',
    },
    {
      symbol: 'ETH',
      tokenName: 'ETH',
      blockchain: 'Ethereum',
      quantity: null,
      currentPrice: 1000,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/64px-Ethereum_logo_2014.svg.png',
      firstValidationTime: '2021-10-10',
      latestValidationTime: '2024-10-11',
      de_identification: true,
      usage: 'de_identification',
    },
    {
      symbol: 'ETH',
      tokenName: 'ETH',
      blockchain: 'Ethereum',
      quantity: 10,
      currentPrice: 1000,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/64px-Ethereum_logo_2014.svg.png',
      firstValidationTime: '2021-10-10',
      latestValidationTime: '2024-10-11',
    },
  ],
  overallFirstValidationTime: '2021-10-10',
  overallLatestValidationTime: '2021-10-11',
}

const fakeNFTData: NFTData = {
  NFTName: 'basedpunks',
  blockchain: 'Ethereum',
  quantity: 3,
  imageUrl: 'https://i.seadn.io/s/raw/files/857e39e54f4fa53eb78d1747e9470478.png?auto=format&dpr=1&w=136&h=136&fr=1',
  firstValidationTime: '2021-10-10',
  latestValidationTime: '2021-10-11',
  fromUserWallet: '0x1234567890', //來自使用者的錢包
  addedTime: '2021-10-10', //資料加入時間
  validationRecords: [],
  NFTs: [],
  de_identification: false,
  dataUsage: 'public',
}
interface ViewModeProps {
  mode: 'edit_mode' | 'view_mode'
  editor: string
}

export default function Page() {
  const [isStamps, setIsStamps] = useState(false)

  return (
    <>
      <div className='w-full bg-neutral p-4'>
        <div role='tablist' className='tabs-boxed tabs bg-base-300' onClick={() => setIsStamps(!isStamps)}>
          <a role='tab' className={isStamps ? 'tab tab-active' : 'tab'}>
            Stamps
          </a>
          <a role='tab' className={isStamps ? 'tab' : 'tab tab-active'}>
            Assets
          </a>
        </div>
      </div>
      {isStamps ? <Stamps /> : <Assets />}
    </>
  )
}

const ItemList = ({ children }) => (
  <li className='flex items-center gap-1 my-2'>
    <svg
      className='text-green-800'
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z'
        fill='currentColor'
        fill-rule='evenodd'
        clip-rule='evenodd'
      ></path>
    </svg>
    <span className='text-sm'>{children}</span>
  </li>
)

const Stamps = () => {
  return (
    <div className='mx-auto flex w-full flex-col flex-wrap items-center gap-2 bg-base-100 p-4'>
      <UserCard
        data={{
          imageUrl:
            'https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU=s48-rw',
          title: 'Github',
          quantity: 12,
        }}
      >
        <div className='rounded-2xl border border-gray-600 p-4 text-base-content'>
          <p className='text-sm'>Contribution Activities</p>
          <ul>
            <ItemList>Create at least 90 days ago</ItemList>
            <ItemList>1 PR on at least 30 distinct days</ItemList>
            <ItemList>200 stars</ItemList>
            <ItemList>50 follower</ItemList>
          </ul>
        </div>
      </UserCard>
      <UserCard
        data={{
          imageUrl: 'https://p7.hiclipart.com/preview/421/879/599/social-media-iphone-organization-logo-twitter.jpg',
          title: 'X',
          quantity: 12,
        }}
      ></UserCard>
      <UserCard
        data={{
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1024px-2021_Facebook_icon.svg.png',
          title: 'Fackbook',
          quantity: 12,
        }}
      ></UserCard>
    </div>
  )
}

const Assets = () => {
  const viewMode: ViewModeProps = {
    mode: 'view_mode',
    editor: '',
  }

  return (
    <div className='mx-auto flex w-full flex-col flex-wrap items-center gap-2 bg-base-100 p-4'>
      {userCryptoData.cryptoTokens.map((token) => (
        <UserHoldCryptoCard viewMode={viewMode} key={token.tokenName} data={token} />
      ))}
      <UserHoldCryptoCard viewMode={viewMode} data={fakeCryptoData} />
      <UserHoldNFTCard viewMode={viewMode} data={fakeNFTData} />
      {/* <div className='flex items-center rounded-box bg-accent p-4 text-accent-content shadow-xl'>
          <div className='flex-1 px-2'>
            <h2 className='text-3xl font-extrabold'>4,600</h2>
            <p className='text-sm text-opacity-80'>Page views</p>
          </div>
          <div className='flex-0'>
            <div className='dropdown dropdown-end dropdown-top'>
              <div>
                <div className='flex space-x-1'>
                  <button className='btn btn-square btn-ghost' aria-label='button component'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      className='inline-block size-6 stroke-current'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      ></path>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      ></path>
                    </svg>
                  </button>
                  <button className='btn btn-square btn-ghost' aria-label='button component'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      className='inline-block size-6 stroke-current'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
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
        </div> */}
    </div>
  )
}
