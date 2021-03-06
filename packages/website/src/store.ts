import create, { GetState, SetState, StateCreator, StoreApi } from "zustand";
import ExecuteWorker from "workerize-loader!./execute.worker";
import { State as StckState } from "stck";
import { Error } from "./types";

export interface State {
  code: string;
  result: StckState | null;
  error: Error | null;
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

const initCode = `
1>a
2>a
a+a

(a
  a>b
)

"hello">o
"world">o
`.trim();

const getInititalState = (): State => {
  const initialState: State = {
    code: initCode,
    error: null,
    result: null,
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

let worker: any = null;

export const [useStore, api] = create<StoreType>(
  log(
    saveOptions((set, _get) => ({
      ...getInititalState(),
      actions: {
        onCodeChange: async code => {
          if (worker != null) {
            worker.terminate();
            worker = null;
          }

          set({ code });

          worker = new ExecuteWorker();

          const { result, error } = await worker.compute(code);
          set({ result, error });

          worker.terminate();
          worker = null;
        },
      },
    })),
  ),
);
