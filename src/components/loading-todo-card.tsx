import React from "react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function LoadingTodoCard() {
  return (
    <Card className="w-full max-w-md p-4 space-y-2 relative">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-full" />
      </div>
      <CardContent className="px-0 pt-1 flex flex-col space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
}
