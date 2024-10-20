import { View, FlatList, ActivityIndicator } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { Text } from "@/components/ui/text";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products</Text>;
  }

  console.log("data");

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
