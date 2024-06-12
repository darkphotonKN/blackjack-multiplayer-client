"use client";

import { Provider } from "react-redux";
import { store } from "./store";

type ProviderProps = {
	children: React.ReactNode;
};

const ProviderWrapper = ({ children }: ProviderProps) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
