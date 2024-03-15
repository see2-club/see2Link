'use client'
import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, image } from "@nextui-org/react";

export default function FittingModalTabs() {
  let tabs = [
    {
      id: "Hair",
      label: "Hair",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      , items: [{ id: "hair1", label: "hair1", content: "hair1", image: '/img/FittingRoom/Hair/Hair_0.png' }, { id: "hair2", label: "hair2", content: "hair2", image: '/img/FittingRoom/Hair/Hair_1.png' }, { id: "hair3", label: "hair3", content: "hair3", image: '/img/FittingRoom/Hair/Hair_2.png' }, { id: "hair4", label: "hair4", content: "hair4", image: '/img/FittingRoom/Hair/Hair_2.png' }]
    },
    {
      id: "Headwear",
      label: "Headwear",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      , items: []
    },
    {
      id: "Accessories",
      label: "Accessories",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      , items: []
    },
    {
      id: "Clothing",
      label: "Clothing",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      , items: []
    },
    {
      id: "Footwear",
      label: "Footwear",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      , items: []
    },
    {
      id: "Other",
      label: "Other",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", items: []

    }
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card className="rounded-none p-0 shadow-none" style={{ background: 'rgba(0,0,0, 0)' }}>
              <CardBody className="rounded-none p-0">
                <div className="grid grid-cols-3 gap-4">
                  {item.items.map((cloths, index) => (
                    <div key={index} className="aspect-square border-2 border-gray-600 bg-gray-600" style={{ clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 0 100%)' }}>
                      <img src={cloths.image} alt={cloths.label} />
                      <p>{cloths.label}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
              {item.content}
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
