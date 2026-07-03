"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { Button } from "@/components/ui/Button";
import { usePublisherStore } from "@/features/publishers/store";
import { useOrderStore } from "@/features/orders/store";
import { PublisherStatusCard } from "@/features/publishers/components/PublisherStatusCard";
import { OrderCard } from "@/features/orders/components/OrderCard";
import { CreateOrderForm } from "@/features/orders/components/CreateOrderForm";
import { Modal } from "@/components/ui/Modal";
import {
  getSpecialOrders,
  getRegularSubscriptions,
} from "@/features/orders/actions";

export const PublisherDetailsScreen = () => {
  const t = useTranslations("PublisherDetailsScreen");

  const { activePublisherId, setActivePublisher, publishers } =
    usePublisherStore();
  const {
    specialOrders,
    regularSubscriptions,
    setSpecialOrders,
    setRegularSubscriptions,
    isLoading,
    setIsLoading,
  } = useOrderStore();

  const [activeTab, setActiveTab] = useState<"SPECIAL" | "REGULAR">("SPECIAL");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const currentPublisher = publishers.find((p) => p.id === activePublisherId);

  useEffect(() => {
    if (!activePublisherId) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [specialRes, regularRes] = await Promise.all([
          getSpecialOrders(activePublisherId),
          getRegularSubscriptions(activePublisherId),
        ]);

        if (specialRes.success && specialRes.data) {
          setSpecialOrders(specialRes.data);
        } else if (specialRes.error) {
          console.error(specialRes.error);
        }

        if (regularRes.success && regularRes.data) {
          setRegularSubscriptions(regularRes.data);
        } else if (regularRes.error) {
          console.error(regularRes.error);
        }
      } catch (error) {
        console.error("Critical loading error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [
    activePublisherId,
    setSpecialOrders,
    setRegularSubscriptions,
    setIsLoading,
  ]);

  if (!currentPublisher) return null;
  const { name, lastName } = currentPublisher;

  const activeSpecial = specialOrders.filter((o) => o.status !== "DELIVERED");
  const activeRegular = regularSubscriptions;
  const historySpecial = specialOrders.filter((o) => o.status === "DELIVERED");

  const totalActiveCount = activeSpecial.length + activeRegular.length;
  const hasExpectedItems =
    specialOrders.some((o) => o.status === "EXPECTED") ||
    regularSubscriptions.some((s) => s.status === "EXPECTED");

  return (
    <div className="space-y-8">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setActivePublisher(null)}
        className="flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>{t("backToButton")}</span>
      </Button>

      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span>{t("firstNameLabel")}</span> {name}
        </h1>
        <p className="mt-2 text-md text-gray-500 flex items-center gap-1">
          <span>{t("lastNameLabel")}</span> {lastName ?? t("noLastName")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {t("ordersTitle")}
              </h3>
              <Button onClick={() => setIsOrderModalOpen(true)}>
                + {t("newOrderButton")}
              </Button>
            </div>

            <div className="flex border-b border-gray-100 gap-4 pt-2">
              <button
                onClick={() => setActiveTab("SPECIAL")}
                className={`pb-2.5 text-sm font-semibold transition-colors border-b-2 px-1 ${
                  activeTab === "SPECIAL"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {t("specialOrdersTab", { count: activeSpecial.length })}
              </button>
              <button
                onClick={() => setActiveTab("REGULAR")}
                className={`pb-2.5 text-sm font-semibold transition-colors border-b-2 px-1 ${
                  activeTab === "REGULAR"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {t("regularOrdersTab", { count: activeRegular.length })}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <div className="h-20 bg-gray-50 animate-pulse rounded-xl border border-gray-100" />
              <div className="h-20 bg-gray-50 animate-pulse rounded-xl border border-gray-100" />
            </div>
          ) : activeTab === "SPECIAL" ? (
            activeSpecial.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400 text-sm">
                {t("noSpecialOrders")}
              </div>
            ) : (
              <div className="space-y-3">
                {activeSpecial.map((order) => (
                  <OrderCard key={order.id} order={order} isRegular={false} />
                ))}
              </div>
            )
          ) : activeRegular.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400 text-sm">
              {t("noRegularOrders")}
            </div>
          ) : (
            <div className="space-y-3">
              {activeRegular.map((sub) => (
                <OrderCard key={sub.id} order={sub} isRegular={true} />
              ))}
            </div>
          )}

          {activeTab === "SPECIAL" && historySpecial.length > 0 && (
            <div className="pt-4 space-y-3">
              <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider px-1">
                {t("historyTitle", { count: historySpecial.length })}
              </h4>
              <div className="space-y-3 opacity-75">
                {historySpecial.map((order) => (
                  <OrderCard key={order.id} order={order} isRegular={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        <PublisherStatusCard
          totalOrders={totalActiveCount}
          needsDelivery={hasExpectedItems}
        />
      </div>

      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title={t("modalTitle", { name })}
      >
        <CreateOrderForm
          publisherId={currentPublisher.id}
          onSuccess={() => setIsOrderModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
