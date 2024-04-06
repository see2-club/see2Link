import React from 'react';

function UserHoldCryptoCard({ data }) {
  const { cryptoName, quantity, currentPrice, image } = data;
  const totalValue = quantity * currentPrice;

  return (
    <div className="flex w-full items-center rounded-box bg-neutral p-4 text-neutral-content shadow-xl">
      <div className="avatar">
        <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          <img src={image} />
        </div>
      </div>
      <div className="w-full flex-col px-2">
        <div className="flex flex-row justify-between px-2">
          <h2 className="flex text-xl font-extrabold">{cryptoName}</h2>
          <h2 className="flex text-xl font-extrabold">數量: {quantity}</h2>
        </div>
        <div className="flex flex-row justify-between px-2">
          <p className="text-sm text-opacity-20">目前價格: ${currentPrice}</p>
          <p className="text-sm text-opacity-20">總價值: ${totalValue}</p>
        </div>
      </div>
      <div className="flex-0">
        <div className="dropdown dropdown-end dropdown-top">
          <div >
            <div className="flex space-x-1">
              <button className="btn btn-square btn-ghost" aria-label="button component">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block size-8 stroke-current">
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
    </div>
  );
}

export default UserHoldCryptoCard;