import db from "@/db/db";

export const dynamic = "force-dynamic";
export default async function Admin() {
  async function orders() {
    try {
      const orders = await db.getOrders();
      orders.sort(
        (a, b) =>
          new Date(b.placedOrderTime).getTime() -
          new Date(a.placedOrderTime).getTime(),
      );
      return (
        <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-3 px-5 md:max-w-[80%]">
          {orders.map((order) => (
            <div
              key={order.id}
              className="w-full min-h-[200px] rounded-lg shadow-sm bg-white p-4 flex flex-row items-center gap-5 overflow-hidden"
            >
              <div className="py-3 flex flex-col gap-1 justify-evenly">
                <p className="text-lg font-bold">
                  {order.customerInfo.name} - {order.customerInfo.grade}
                </p>
                {order.lunches.length > 0 &&
                  order.lunches.map((lunch) => (
                    <p
                      key={lunch.lunchId}
                      className="text-sm font-medium text-deliGreenDark"
                    >
                      {lunch.name}: {lunch.amount}
                    </p>
                  ))}
                <p className="text-base font-semibold">
                  {order.totalPrice.toLocaleString("de-DE")}${" "}
                  {order.paid ? (
                    <span className="font-bold text-green-500">Pagado ✅</span>
                  ) : (
                    <span className="font-bold text-red-500">No pagado ❌</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error(error);
      return <div>error</div>;
    }
  }

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold">Órdenes</h1>
      {orders()}
    </div>
  );
}
