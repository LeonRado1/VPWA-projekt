<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center q-my-xl">
        <q-card class="q-pa-md shadow-2 rounded-xl" style="min-width: 400px">
          <div class="flex flex-center q-my-lg">
            <img style="max-width: 15rem" alt="Threadly Logo" src="/logo-light.svg" />
          </div>
          <q-tabs>
            <q-route-tab to="/auth/login" label="Login" exact />
            <q-route-tab to="/auth/signup" label="Signup" exact />
          </q-tabs>
          <q-separator />
          <router-view />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts"></script>
