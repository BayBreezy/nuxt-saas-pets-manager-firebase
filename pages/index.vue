<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Sign in</h1>
        <p class="mt-2 text-lg text-muted-foreground">
          Welcome back! Enter your details to get started.
        </p>
      </div>
      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="email" label="Email *" placeholder="john@example.com" type="email" />
          <UiVeeInput name="password" label="Password *" type="password" />
          <p>
            <NuxtLink
              class="text-sm font-semibold text-primary hover:underline"
              to="/forgot-password"
              >Forgot password?</NuxtLink
            >
          </p>
          <UiButton type="submit" class="w-full"> Sign in </UiButton>
          <UiDivider label="or" />
          <UiButton @click="signInWithGoogle" type="button" class="w-full" variant="outline">
            <Icon name="logos:google-icon" /> Sign in with Google
          </UiButton>
        </fieldset>
      </form>
      <p class="mt-10 text-center text-sm">
        Don't have an account?
        <NuxtLink class="text-sm font-semibold text-primary hover:underline" to="/register"
          >Create one here</NuxtLink
        >
      </p>
    </div>
  </UiContainer>
</template>

<!-- This has to be created in a separate script tag -->
<script lang="ts">
  import { GoogleAuthProvider } from "firebase/auth";

  export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script lang="ts" setup>
  import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

  definePageMeta({ middleware: "already-logged-in" });
  useSeoMeta({
    title: "Sign in",
    description: "Sign in to your account",
  });

  // get auth instance
  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(LoginSchema),
  });

  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: "We are signing you in",
    });
    try {
      await signInWithEmailAndPassword(auth!, values.email, values.password);
      useSonner.success("Account created successfully!", {
        id: loading,
      });
      // redirect to the dashboard
      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      // show error
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  });

  const signInWithGoogle = async () => {
    const loading = useSonner.loading("Loading...", {
      description: "We are signing you in",
    });
    try {
      await signInWithPopup(auth!, googleAuthProvider);
      useSonner.success("Account created successfully!", {
        id: loading,
      });
      // redirect to the dashboard
      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      // show error
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  };
</script>
