import { create } from "zustand";

let useStore = create((set) => ({
  user: null,

  login: (_user) => {
    set({ user: _user });
    localStorage.setItem("user", JSON.stringify(_user));
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },

  setUser: (_user) => {
    set({ user: _user});
  },

  tranferFrom: (_amount) =>{
    set((state) => ({
      user: { ...state.user, balance: state.user.balance - _amount },
    }));
    localStorage.setItem("user", JSON.stringify(useStore.getState().user));
  }
}));

export default useStore;
