import { View, Text, FlatList, useWindowDimensions } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";
import { Button, ButtonText } from "@/components/ui/button";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  return (
    <FlatList
      key={numColumns}
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2 max-w-[960px] mx-auto p-3 w-full"
      numColumns={numColumns}
    />
  );
}
