import { shallowMount } from "@vue/test-utils";
import Navbar from "@/components/NavBar.vue";
import store from "@/store";
import router from "@/router";

let wrapper;

describe("NavBar.vue", () => {
  beforeEach(() => {
    wrapper = shallowMount(Navbar, { store, router });
  });

  it("should should show login/register options initially", () => {
    const navItems = wrapper.findAll(".nav-item");
    expect(navItems.length).toBe(3);
  });

  it("should show username after login", async () => {
    await wrapper.vm.$store.dispatch("users/loginUser", {
      email: "sabir.jmi11@gmail.com",
      password: "oss@4321"
    });
    const navItems = wrapper.findAll(".nav-item");
    const username = navItems.at(navItems.length - 1).text();
    expect(username).toBe("sabir-jmi");
  });
});
