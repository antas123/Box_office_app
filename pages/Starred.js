// import React, { useEffect, useState } from "react";
// import MainPageLayout from "../components/MainPageLayout";
// import ShowGrid from "../components/show/ShowGrid";
// import { apiGet } from "../misc/config";
// import { useShows } from "../misc/custom-hooks";

// function Starred() {
//   const [starred] = useShows();

//   const [Show, setShow] = useState(null);
//   const [Loading, setLoading] = useState(true);
//   const [Error, setError] = useState(null);

//   useEffect(() => {
//     if (starred && starred.length > 0) {
//       const promises = starred.map((showId) => apiGet(`/shows/${showId}`));

//       Promise.all(promises)
//         .then((apiData) => apiData.map((show) => ({ show })))
//         .then((results) => {
//           setShow(results);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [starred]);

//   return (
//     <MainPageLayout>
//       {Loading && <div>shows are still loading</div>}
//       {Error && <div>error : {Error}</div>}
//       {!Loading && !Show && <div>no shows were added</div>}
//       {!Loading && !Error && Show && <ShowGrid data={Show} />}
//     </MainPageLayout>
//   );
// }

// export default Starred;
import React, { useState, useEffect } from "react";
import { useShows } from "../misc/custom-hooks";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";

function Starred() {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are Loading.</div>}
      {error && <div>No shows found.</div>}
      {!isLoading && !shows && <div>No Shows were Added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
}

export default Starred;