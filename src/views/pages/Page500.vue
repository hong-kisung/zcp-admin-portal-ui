<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">500</h1>
            <h4 class="pt-3">Houston, we have a problem!</h4>
            <p class="text-muted">연결이 불안정합니다. 잠시 뒤 다시 시도해주세요.</p>
          </div>
          <div class="text-center">
              <router-link :to="{ path: '/' }">
                <b-button variant="primary"><i class="fa fa-redo"></i> Go to Main</b-button>
              </router-link>
          </div>
          <!--
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fa fa-search"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <input id="prependedInput" class="form-control" size="16" type="text" placeholder="What are you looking for?">
            <b-input-group-append>
              <b-button variant="info">Search</b-button>
            </b-input-group-append>
          </b-input-group>
          -->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page500'
}
</script>
