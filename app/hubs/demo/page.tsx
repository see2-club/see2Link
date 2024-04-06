import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import UserHoldCryptoCard from '@/components/hub/page/userHoldCryptoCard'
import UserHoldNFTCard from '@/components/hub/page/userHoldNFTCard'
import { chip } from '@nextui-org/react';
const { faker } = require('@faker-js/faker');
// or, if desiring a different locale
// const { fakerDE: faker } = require('@faker-js/faker');

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

// 假資料
interface ValidationInfo {
  firstValidationTime: string;
  latestValidationTime: string;
  fromUserWallet: string;//來自使用者的錢包
  addedTime: string;//資料加入時間
  validationRecords: any[]; // 驗證紀錄
}

interface NFT {
  tokenId: string; // NFT 的唯一識別碼
  tokenUrl: number; // NFT 的 URL
  name: string; // NFT 的名稱
  description: string; // NFT 的描述
  image: string; // NFT 的圖片 URL
  owner: string; // NFT 的擁有者的地址
  creator: string; // NFT 的創建者的地址
  creationTime: string; // NFT 的創建時間
  blockchain: string; // NFT 所在的區塊鏈
  contractAddress: string; // NFT 所在的智能合約地址
  collectionName?: string; // NFT 的系列名稱，如果有的話
}

interface NFTData extends ValidationInfo {
  NFTName: string;
  blockchain: string;
  quantity: number;
  image: string;
  NFTs: any[];
}

interface NFTInfo {
  name: string;
  tokenID: string;
  tokenUrl: number;
  image: string;
}

interface UserNFTCollection extends ValidationInfo {
  collectionName: string;
  blockchain: string;
  totalQuantity: number;
  collectionImage: string;
  NFTs: NFTInfo[];
}


interface CryptoData extends ValidationInfo {
  cryptoName: string;
  blockchain: string;
  quantity: number;
  currentPrice: number;
  image: string;
}

const fakeCryptoData: CryptoData = {
  cryptoName: 'Bitcoin',
  blockchain: 'Bitcoin',
  quantity: 10,
  currentPrice: 60000,
  image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  firstValidationTime: '2021-10-10',
  latestValidationTime: '2021-10-11',
  fromUserWallet: '0x1234567890',//來自使用者的錢包
  addedTime: '2021-10-10',//資料加入時間
  validationRecords: [], // 驗證紀錄
};

const userCryptoData = {
  cryptoTokens: [
    {
      name: 'BTC',
      blockchain: 'Bitcoin',
      quantity: 3,
      currentPrice: 60000,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
      firstValidationTime: '2021-10-10',
      latestValidationTime: '2028-10-11',
      fromUserWallet: '0x1234567890',//來自使用者的錢包
      addedTime: '2021-10-10',//資料加入時間
      validationRecords: [], // 驗證紀錄
    },
    {
      name: 'ETH',
      blockchain: 'Ethereum',
      quantity: 10,
      currentPrice: 1000,
      imageUrl: 'https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp',
      firstValidationTime: '2021-10-10',
      latestValidationTime: '2024-10-11',
    },
  ],
  overallFirstValidationTime: '2021-10-10',
  overallLatestValidationTime: '2021-10-11',
};

const fakeNFTData: NFTData = {
  NFTName: 'basedpunks',
  blockchain: 'Ethereum',
  quantity: 3,
  image: 'https://i.seadn.io/s/raw/files/857e39e54f4fa53eb78d1747e9470478.png?auto=format&dpr=1&w=136&h=136&fr=1',
  firstValidationTime: '2021-10-10',
  latestValidationTime: '2021-10-11',
  fromUserWallet: '0x1234567890', //來自使用者的錢包
  addedTime: '2021-10-10', //資料加入時間
  validationRecords: [],
  NFTs: []
};

// UserNFTDataSet UserCryptoDataSet

export default function Page() {
  return (
    <div className='mx-auto flex w-full flex-col flex-wrap items-center gap-2  overflow-auto p-4'>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center gap-2 bg-black  p-4'>
        <div className="p-10">
          <button className="btn btn-primary">Button</button>
        </div>

      </div>

      <div className='mx-auto flex w-full flex-col flex-wrap items-center gap-2  p-4'>
        <div className="p-10">
          <button className="btn btn-primary">Button</button>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block size-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block size-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            {/* <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block size-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div> */}
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>




        <UserHoldCryptoCard data={fakeCryptoData} />
        <UserHoldNFTCard data={fakeNFTData} />



        <div className="flex items-center rounded-box bg-accent p-4 text-accent-content shadow-xl">
          <div className="flex-1 px-2">
            <h2 className="text-3xl font-extrabold">4,600</h2>
            <p className="text-sm text-opacity-80">Page views</p>
          </div>
          <div className="flex-0">
            <div className="dropdown dropdown-end dropdown-top">
              <div >
                <div className="flex space-x-1">
                  <button className="btn btn-square btn-ghost" aria-label="button component">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block size-6 stroke-current">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </button>
                  <button className="btn btn-square btn-ghost" aria-label="button component"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block size-6 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                  </button>
                </div>
              </div>
              <div className="dropdown-content py-2">
                <div className="bg-neutral-focus card compact w-72 rounded-box text-neutral-content shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title font-extrabold capitalize">button component</h2>
                    <p className="text-sm text-neutral-content text-opacity-80"> Buttons come in various shapes, colors and sizes </p>
                    <div className="mt-4 flex justify-end">
                      <a target="blank" href="https://daisyui.com/components/button" className="btn btn-primary btn-sm xl:btn-md"> See component </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  )
}
