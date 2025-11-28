"use client";

import React, { useState } from "react";
import UserTable from "./EmailTable";

const ActivityFeed: React.FC = () => {
  return (
    <div className="mt-5">
      <div>
        
        <UserTable setIsDrawerOpen={() => console.log("opened")} />,
      </div>
    </div>
  );
};

export default ActivityFeed;
