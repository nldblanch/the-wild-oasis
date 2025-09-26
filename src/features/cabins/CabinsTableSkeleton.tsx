import Skeleton from "../../ui/Skeleton";
import { useScreenSize } from "../../hooks/useScreenSize";

function CabinTableSkeleton() {
  const screenSize = useScreenSize();
  const isMobile = screenSize === "mobile";
  const columns = isMobile ? "1fr" : "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr";

  return (
    <Skeleton.Table>
      {!isMobile && (
        <Skeleton.TableRow
          columns={columns}
          style={{ fontWeight: "600", backgroundColor: "var(--color-grey-50)" }}
        >
          <div></div>
          <Skeleton.Box width="60%" height="1.4rem" />
          <Skeleton.Box width="70%" height="1.4rem" />
          <Skeleton.Box width="50%" height="1.4rem" />
          <Skeleton.Box width="60%" height="1.4rem" />
          <div></div>
        </Skeleton.TableRow>
      )}

      {[1, 2, 3, 4].map((i) => (
        <Skeleton.TableRow key={i} columns={columns}>
          {isMobile ? (
            <div>
              <div
                style={{ display: "flex", gap: "1.2rem", marginBottom: "1rem" }}
              >
                <Skeleton.Box
                  width="8rem"
                  height="6rem"
                  style={{ borderRadius: "var(--border-radius-md)" }}
                />
                <div style={{ flex: 1 }}>
                  <Skeleton.Box width="80%" height="1.6rem" />
                  <Skeleton.Box
                    width="60%"
                    height="1.2rem"
                    style={{ marginTop: "0.4rem" }}
                  />
                  <Skeleton.Box
                    width="40%"
                    height="1.2rem"
                    style={{ marginTop: "0.4rem" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <Skeleton.Button />
                <Skeleton.Button />
              </div>
            </div>
          ) : (
            <>
              <Skeleton.Box
                width="6rem"
                height="4rem"
                style={{ borderRadius: "var(--border-radius-md)" }}
              />
              <div>
                <Skeleton.Box width="80%" height="1.6rem" />
                <Skeleton.Box
                  width="60%"
                  height="1.2rem"
                  style={{ marginTop: "0.4rem" }}
                />
              </div>
              <Skeleton.Box width="90%" height="1.4rem" />
              <Skeleton.Box width="70%" height="1.4rem" />
              <Skeleton.Box width="60%" height="1.4rem" />
              <Skeleton.Box width="2.4rem" height="2.4rem" />
            </>
          )}
        </Skeleton.TableRow>
      ))}
    </Skeleton.Table>
  );
}

export default CabinTableSkeleton;
