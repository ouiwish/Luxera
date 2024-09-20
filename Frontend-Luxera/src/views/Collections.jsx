"use client";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X } from "lucide-react";
import Title from "@/title";
import {
  ApiCategories,
  ApiCollections,
  ApiSignDeal,
} from "@/lib/fetchCollections";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Collections() {
  const { isAuthenticated, loading } = useAuth();
  const [categories, setCategories] = useState([]);
  const [fashionDeals, setDeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dealsLoading, setDealsLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(state);
    if (state && state.deal) {
      setSelectedDeal(state.deal);
      setDialogOpen(true);

      // Clear the state
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [state]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    if (
      categoryParam &&
      categories.some((category) => category.slug === categoryParam)
    ) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }

    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiCategories();
        setCategories(response.data);

        if (searchParams.get("category")) {
          setActiveCategory(searchParams.get("category"));
        }

        if (searchParams.get("search")) {
          setSearchTerm(searchParams.get("search"));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCollections = async () => {
      try {
        const response = await ApiCollections();
        console.log(response.data);
        setDeals(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setDealsLoading(false);
      }
    };

    fetchCategories();
    fetchCollections();
  }, []);

  // Set loading state for testing loading state
  // useEffect(() => {
  //   const timer = setTimeout(() => setDealsLoading(false), 600);
  //   return () => clearTimeout(timer);
  // }, []);

  const filteredDeals = fashionDeals.filter((deal) => {
    const matchesCategory =
      activeCategory === "All" || deal.category.slug === activeCategory;
    const matchesSearch =
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.category.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryId) => {
    setDealsLoading(true);
    setActiveCategory(categoryId);
    const newParams = new URLSearchParams(searchParams);

    if (categoryId === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryId);
    }

    setSearchParams(newParams);
    setDealsLoading(false);
  };

  const handleSearch = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set("search", e.target.value);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
    setSearchTerm(e.target.value);
  };

  const openDialog = (deal) => {
    // check if user is logged in
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to sign a deal. You must be logged in to your account.",
        variant: "destructive",
      })

      return navigate("/login", {
        replace: true,
        state: { from: { pathname: location.pathname, deal } }
      });
    }

    setSelectedDeal(deal);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedDeal(null);
  };

  const handleSignDeal = async () => {
    setDealsLoading(true);
    setIsSigned(true);
    try {
      const response = await ApiSignDeal({ deal_id: selectedDeal.id });
      console.log("Deal signed:", response.data);
      closeDialog();
      if (response.status === 200) {
        const response = await ApiCollections();
        setDeals(response.data);
        toast({
          title: "Deal Signed",
          description: "Your deal has been signed successfully.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error signing deal:", error);
      toast({
        title: "Failed to sign deal",
        description: "There was an error signing your deal, please try again.",
        variant: "destructive",
      });
    } finally {
      setDealsLoading(false);
      setIsSigned(false);
    }
  };

  const categoryExists = categories.some(
    (category) => category.slug === activeCategory
  );

  const clearSearch = (e) => {
    e.preventDefault();
    // Lets clean only search term params
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
    setSearchTerm("");
  };

  return (
    <>
      <Title title="Collections" />
      {loading ? (
        <></>
      ) : (
        <>
          <div className="container mx-auto px-4 py-12 md:py-6">
            <h1 className="text-3xl font-bold mb-6">Exclusive Fashion Deals</h1>

            <div className="flex flex-col space-y-4 mb-20 sm:mb-20 md:mb-4 py-2">
              <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Search deals..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <X 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer"
                  onClick={(e) => clearSearch(e)}
                  />
                )}

              </div>
              <Tabs
                defaultValue={activeCategory}
                className="w-full justify-between items-center"
              >
                <TabsList className="flex grid grid-cols-2 md:grid-cols-5 w-full gap-2">
                  <TabsTrigger
                    value=""
                    data-state={activeCategory === "All" ? "active" : ""}
                    onClick={() => handleCategoryChange("All")}
                    className="px-3 py-1.5 text-sm whitespace-nowrap flex-grow sm:flex-grow-0"
                  >
                    All Collections
                  </TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.slug}
                      value={category.slug}
                      data-state={
                        activeCategory === category.slug ? "active" : ""
                      }
                      onClick={() => handleCategoryChange(category.slug)}
                      className="px-3 py-1.5 text-sm whitespace-nowrap flex-grow sm:flex-grow-0"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {dealsLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden shadow-lg">
                    <CardContent className="p-0">
                      <img
                        src={deal.image} // Use the image URL from the API response
                        alt={deal.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">
                          {deal.name}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-2">
                          {deal.category.name}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-primary">
                            ${deal.deal_price}.00
                          </span>
                          <span className="text-sm line-through text-muted-foreground">
                            ${deal.original_price}.00
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="bg-primary/10 text-primary text-sm font-semibold py-1 px-2 rounded">
                            Save {deal.discount}%
                          </span>
                          <Button size="sm" onClick={() => openDialog(deal)}>
                            Get Deal
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!dealsLoading && filteredDeals.length === 0 && (
              <div className="flex flex-col justify-center items-center w-full h-64">
                {searchTerm && (
                  <p className="text-muted-foreground">No results found for your search.</p>
                )}

                {!dealsLoading && categories.length > 0 && !categoryExists && (
                  <p className="text-muted-foreground">Category not found.</p>
                )}
              </div>
            )}

            {selectedDeal && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                      {selectedDeal.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedDeal.category.name}
                    </p>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4">
                    <img
                      src={selectedDeal.image}
                      alt={selectedDeal.name}
                      className="w-full h-48 object-cover rounded-2xl"
                    />

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Original Price: ${selectedDeal.original_price}.00
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Deal Price: ${selectedDeal.deal_price}.00
                        </p>
                      </div>
                      <DialogDescription>
                        <span className="bg-primary/10 text-primary text-sm font-semibold py-2 px-2 rounded-2xl">
                          Save {selectedDeal.discount}%
                        </span>
                      </DialogDescription>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={closeDialog}>
                      Cancel
                    </Button>
                    <Button
                      disabled={isSigned}
                      onClick={handleSignDeal}
                    >
                      {isSigned ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Sign a Deal
                        </>
                      ) : (
                        "Sign a Deal"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </>
      )}
    </>
  );
}
