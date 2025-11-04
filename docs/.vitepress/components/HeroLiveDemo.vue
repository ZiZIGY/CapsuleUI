<script setup>
  import '../../@capsule';
</script>

<template>
  <div class="home-demo">
    <capsule-stepper
      current-step="1"
      id="home-stepper"
    >
      <capsule-stepper-steps>
        <capsule-stepper-step>Overview</capsule-stepper-step>
        <capsule-stepper-step>Loading</capsule-stepper-step>
        <capsule-stepper-step>More</capsule-stepper-step>
      </capsule-stepper-steps>

      <capsule-stepper-panels animation="x">
        <!-- Panel 1: Overview with Alert, Badge, Buttons -->
        <capsule-stepper-panel>
          <div class="panel">
            <capsule-alert>
              <capsule-alert-title>CapsuleUI</capsule-alert-title>
              <capsule-alert-description>
                Composable web components. Try actions and navigate steps.
              </capsule-alert-description>
            </capsule-alert>

            <div class="row">
              <capsule-badge>New</capsule-badge>
              <capsule-badge variant="outline">v1</capsule-badge>
              <capsule-badge variant="ghost">Docs</capsule-badge>
            </div>

            <div class="row end">
              <capsule-button
                onclick="document.getElementById('home-stepper').next()"
              >
                Next</capsule-button
              >
            </div>
          </div>
        </capsule-stepper-panel>

        <!-- Panel 2: Loading with Skeletons -->
        <capsule-stepper-panel>
          <div class="panel">
            <div class="row column">
              <capsule-skeleton
                style="width: 60%; height: 1rem"
              ></capsule-skeleton>
              <capsule-skeleton
                variant="text"
                style="width: 80%"
              ></capsule-skeleton>
              <div class="row gap">
                <capsule-skeleton
                  variant="circular"
                  style="width: 3rem; height: 3rem"
                ></capsule-skeleton>
                <capsule-skeleton
                  style="width: 200px; height: 2.5rem"
                ></capsule-skeleton>
              </div>
            </div>

            <div class="row between">
              <capsule-button
                variant="outline"
                onclick="document.getElementById('home-stepper').previous()"
                >Previous</capsule-button
              >
              <capsule-button
                onclick="document.getElementById('home-stepper').next()"
                >Next</capsule-button
              >
            </div>
          </div>
        </capsule-stepper-panel>

        <!-- Panel 3: More with Accordion -->
        <capsule-stepper-panel>
          <div class="panel">
            <capsule-accordion collapsible>
              <capsule-accordion-panel open>
                <capsule-accordion-trigger
                  >What is CapsuleUI?</capsule-accordion-trigger
                >
                <capsule-accordion-content>
                  Unstyled, accessible web components you control. Copy, paste,
                  customize.
                </capsule-accordion-content>
              </capsule-accordion-panel>
              <capsule-accordion-panel>
                <capsule-accordion-trigger
                  >How to start?</capsule-accordion-trigger
                >
                <capsule-accordion-content>
                  Run <code>npx capsule add Button</code> and include
                  <code>@capsule/global.css</code> and
                  <code>@capsule/index.js</code>.
                </capsule-accordion-content>
              </capsule-accordion-panel>
            </capsule-accordion>

            <div class="row between">
              <capsule-button
                variant="outline"
                onclick="document.getElementById('home-stepper').previous()"
                >Previous</capsule-button
              >
              <capsule-button
                variant="primary"
                onclick="location.href='/components/'"
                >Browse Components</capsule-button
              >
            </div>
          </div>
        </capsule-stepper-panel>
      </capsule-stepper-panels>
    </capsule-stepper>
  </div>
</template>

<style scoped>
  .home-demo {
    margin: 2rem 0;
    padding: 1.25rem;
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
  }
  .home-demo .panel {
    padding: 1rem 0;
  }
  .home-demo .row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
  .home-demo .row.column {
    flex-direction: column;
    align-items: flex-start;
  }
  .home-demo .row.end {
    justify-content: flex-end;
  }
  .home-demo .row.between {
    justify-content: space-between;
  }
  .home-demo .row.gap {
    gap: 1rem;
  }
</style>
