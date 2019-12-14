import create, { GetState, SetState, StateCreator, StoreApi } from "zustand";

export interface State {
  code: string;
}

export interface Actions {
  onCodeChange: (value: string) => void;
}

type StoreType = State & { actions: Actions };

type Middleware<S> = (
  config: StateCreator<S>,
) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S;

const log: Middleware<StoreType> = config => (set, get, api) =>
  config(
    args => {
      set(args);
      // console.log("new state", get());
    },
    get,
    api,
  );

const saveOptions: Middleware<StoreType> = config => (set, get, api) =>
  config(
    args => {
      set(args);
      const newState: State = get();
      setTimeout(() => {
        localStorage.setItem("state", JSON.stringify(newState));
      }, 0);
    },
    get,
    api,
  );

const getInititalState = (): State => {
  const initialState: State = {
    code: "",
  };

  const item =
    typeof window !== "undefined" ? localStorage.getItem("state") : null;

  if (item !== null) {
    try {
      const savedOptions = JSON.parse(item) as Partial<State>;
      return {
        ...initialState,
        ...savedOptions,
      };
    } catch (e) {
      // do nothing
    }
  }

  return initialState;
};

export const [useStore] = create<StoreType>(
  log(
    saveOptions((set, _get) => ({
      ...getInititalState(),
      actions: {
        onCodeChange: code => {
          set({ code });
        },
      },
    })),
  ),
);
