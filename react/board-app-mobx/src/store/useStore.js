import { articleListStore } from "./aricleList";
import { saveInfoStore } from "./saveInfo";

const useStore = () => {
    return { articleListStore, saveInfoStore };
};

export default useStore;
