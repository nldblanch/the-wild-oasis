import Skeleton from "../../ui/Skeleton";
import { useScreenSize } from "../../hooks/useScreenSize";

function BookingTableSkeleton() {
  const screenSize = useScreenSize();
  const isDesktop = screenSize === "desktop";
  const columns = isDesktop ? "0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem" : "1fr";

  return (
    <Skeleton.Table>
      {isDesktop && (
        <Skeleton.TableRow
          columns={columns}
          style={{ fontWeight: "600", backgroundColor: "var(--color-grey-50)" }}
        >
          <Skeleton.Box width="80%" height="1.4rem" />
          <Skeleton.Box width="60%" height="1.4rem" />
          <Skeleton.Box width="70%" height="1.4rem" />
          <Skeleton.Box width="50%" height="1.4rem" />
          <Skeleton.Box width="60%" height="1.4rem" />
          <div></div>
        </Skeleton.TableRow>
      )}

      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton.TableRow key={i} columns={columns}>
          {isDesktop ? (
            <>
              <Skeleton.Box width="90%" height="1.4rem" />
              <div>
                <Skeleton.Box width="80%" height="1.4rem" />
                <Skeleton.Box
                  width="60%"
                  height="1.2rem"
                  style={{ marginTop: "0.4rem" }}
                />
              </div>
              <div>
                <Skeleton.Box width="70%" height="1.4rem" />
                <Skeleton.Box
                  width="50%"
                  height="1.2rem"
                  style={{ marginTop: "0.4rem" }}
                />
              </div>
              <Skeleton.Box
                width="80%"
                height="2.4rem"
                style={{ borderRadius: "var(--border-radius-sm)" }}
              />
              <Skeleton.Box width="70%" height="1.4rem" />
              <Skeleton.Box width="2.4rem" height="2.4rem" />
            </>
          ) : (
            <div>
              <Skeleton.Box width="60%" height="1.6rem" />
              <Skeleton.Box
                width="80%"
                height="1.2rem"
                style={{ marginTop: "0.4rem" }}
              />
              <Skeleton.Box
                width="40%"
                height="1.2rem"
                style={{ marginTop: "0.4rem" }}
              />
            </div>
          )}
        </Skeleton.TableRow>
      ))}
    </Skeleton.Table>
  );
}

export default BookingTableSkeleton;
