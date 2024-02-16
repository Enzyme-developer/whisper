import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { featureType } from "../types/types";
import Icon from "./Icon";

const Feature = ({ featureData }: { featureData: featureType }) => {
  return (
    <Card className="w-full md:w-[320px]">
      <CardHeader>
        <Icon name={featureData.icon} />
        <CardTitle className="text-lg">{featureData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{featureData.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Feature;
