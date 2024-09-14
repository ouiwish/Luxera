"use client";

// External Libraries
import React, {useState} from "react";
import { Link } from "react-router-dom";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Icons
import {
  SearchIcon,
  Ellipsis,
  PlusIcon,
  EyeIcon,
  Loader2,
  Check,
  X,
} from "lucide-react";

const Deals = ({ deals, dealsLoading, openDialogView }) => {

  const [searchTerm, setSearchTerm] = useState("");

  console.log(deals)

  const handleSearch = (e) => {
    // update search term
    setSearchTerm(e.target.value);
  };

  const filteredDeals = deals.filter(
    (deal) =>
      deal.deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.deal.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">
            Deals History
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-auto">
              <div className="relative w-full sm:w-full">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  name="search"
                  id="search"
                  className="pl-8 w-full"
                  placeholder="Search..."
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <Link to="/collections">
                <Button className="w-full sm:w-auto">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Sign a Deal
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {dealsLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              filteredDeals.map((deal) => (
                <Card
                  key={deal.deal_id}
                  className="border-slate-400 dark:border-input"
                >
                  <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 space-y-4 sm:space-y-0">
                    <p className="text-lg font-semibold">
                      {deal.deal.name} | {deal.deal.category.name} | Discount{" "}
                      {deal.deal.discount}% from <span className="line-through">${deal.deal.original_price}.00</span> to{" "} ${deal.deal.deal_price}.00
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                      <Button
                        variant="link"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        {deal.status === "pending" ? (
                          <>
                            <Ellipsis className="h-4 w-4 mr-2 animate-pulse text-yellow-500" />
                            Reviewing
                          </>
                        ) : deal.status === "accepted" ? (
                          <>
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Approved Deal
                          </>
                        ) : deal.status === "declined" ? (
                          <>
                            <X className="h-4 w-4 mr-2 text-red-500" />
                            Rejected Deal
                          </>
                        ) : null}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => openDialogView(deal)}
                      >
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {dealsLoading === false && deals.length === 0 && (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">No Deals Found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Deals;
