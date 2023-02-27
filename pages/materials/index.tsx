import CustomLoader from "@components/CustomLoader";
import Heading from "@components/Headings";
import Layout from "@components/layout";
import { Search } from "@components/layout/Search";
import MaterialsWithCategory from "@components/materials/MaterialsWithCategory";
import SearchResults from "@components/materials/SearchResults";
import useCategories from "@hooks/useCategories";
import { useDebouncedValue } from "@mantine/hooks";
import { Category } from "@prisma/client";
import { useState } from "react";

const Material = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced] = useDebouncedValue(searchQuery, 500);
  const { categories, isLoading } = useCategories();

  const showSearchResults = debounced.trim() !== "";

  if (isLoading) return <CustomLoader />;
  return (
    <Layout>
      <div className="px-8 py-6 md:w-2/3 mx-auto">
        <div className="flex justify-between">
          <Heading variant="h1" className="border-b-0">
            {showSearchResults
              ? `Showing results for ${debounced}`
              : "Browse all the materials"}
          </Heading>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            className="w-1/2"
            placeholder="Search materials"
          />
        </div>
        {showSearchResults ? (
          <SearchResults searchQuery={debounced} />
        ) : (
          <div className="pt-8">
            {categories.map((value: Category) => (
              <MaterialsWithCategory key={value.id} category={value} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Material;
