<template>
  <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div class="pointer-events-auto w-screen max-w-2xl">
            <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2
                    class="text-base font-semibold leading-6 text-gray-900 flex"
                    id="slide-over-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 mr-4">
                      <path
                        fill-rule="evenodd"
                        d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                        clip-rule="evenodd" />
                    </svg>

                    Aperçu
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      @click="closeQuickViewIsOpen"
                      type="button"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span class="sr-only">Close panel</span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div id="quickview" class="relative mt-6 flex-1 px-4 sm:px-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLayoutStore } from '../../../store/layout.store'
import { mapActions } from 'pinia'

export default {
  props: {
    title: { type: String, required: true },
  },
  name: 'QuickView',
  methods: {
    ...mapActions(useLayoutStore, ['closeQuickViewIsOpen']),
  },
}
</script>
