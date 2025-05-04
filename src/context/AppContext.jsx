// Create a unified data loader hook
const useInitialDataLoad = () => {
    const { loadCart, loadWishlist, loadProducts } = useAppContext();
    
    useEffect(() => {
      const loadData = async () => {
        await Promise.all([
          loadCart(),
          loadProducts(),
          loadWishlist()
        ]);
      };
      
      loadData();
    }, []); // Empty dependency array ensures single load
  };