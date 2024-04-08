/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CryptoIcons from '@/components/hub/Crypto/CryptoIcons';


interface ViewModeProps {
  mode: 'edit_mode' | 'view_mode';
  editor: string;
}

function UserHoldCryptoCard({ data, viewMode = {
  mode: 'edit_mode',
  editor: 'editor',
} }) {
  const { tokenName, quantity, currentPrice, imageUrl, de_identification,
    dataUsage } = data;

  const holeQuantity = de_identification ? '???????' : quantity;
  const totalValue = de_identification ? '*******' : quantity * currentPrice;

  const renderInfo = () => {
    if (viewMode.mode !== 'view_mode') {
      return null;
    }
    if (de_identification === true) {
      return (
        <div className="flex-0">
          <div className="dropdown dropdown-end dropdown-top">
            <div className="flex space-x-1">
              <button className="btn btn-square btn-ghost" aria-label="button component">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  const renderEditor = () => {
    if (viewMode.mode !== 'edit_mode') {
      return null;
    }
    return (
      <div className="flex-0">
        <div className="dropdown dropdown-end dropdown-top">
          <div >
            <div className="flex space-x-1">
              <button className="btn btn-square btn-ghost" aria-label="button component">
                <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block size-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
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
    );
  }

  return (
    <div className="flex w-full items-center rounded-box bg-neutral px-4 py-3 text-neutral-content shadow-xl">
      <div className="avatar">
        {/* <CryptoIcons name={tokenName} /> */}
        <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          <img src={imageUrl} />
        </div>
      </div>
      <div className="w-full flex-col px-2">
        <div className="text-md flex flex-row
justify-between px-2 md:text-xl">
          <h2 className="flex  font-extrabold">{tokenName}</h2>
          <h2 className="flex  font-extrabold">{holeQuantity}</h2>
        </div>
        <div className=" flex flex-row justify-between
px-2 text-sm md:text-base">
          <p className=" text-opacity-20">${currentPrice}</p>
          <p className=" text-opacity-20">${totalValue} usd</p>
        </div>
      </div>
      {renderInfo()}
      {renderEditor()}
    </div >
  );
}

export default UserHoldCryptoCard;