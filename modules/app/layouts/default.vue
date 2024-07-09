<template>
  <main h-full flex flex-col>
    <NavigationBar />

    <div flex-1>
      <slot />
    </div>

    <AppFooter />
  </main>
</template>
