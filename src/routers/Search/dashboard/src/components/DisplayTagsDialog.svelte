<!--
  @component
  A dialog for displaying tags for content.
-->
<script lang="ts">
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import List, {
    Item,
    Text,
    PrimaryText,
    SecondaryText,
    Meta,
    Graphic,
  } from "@smui/list";
  import {downloadJSON} from '../Utils';
  import TagItem from './TagItem.svelte';

  export let displayName: string = '';
  export let taxonomyTags: object = {};
  export let open = true;

  // FIXME: check that it shows correct tags when item is changed

  function close() {
    open = false;
  }

  function getVocabName(tag) {
    return Object.keys(tag).pop();
  }
</script>

<Dialog
  bind:open
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="display-tags-title">Metadata for {displayName}</Title>
  <Content id="display-tags-content">
    <List>
      <TagItem tag={taxonomyTags}/>
    </List>
  </Content>
  <div class="dialog-actions">
    <Button on:click={close}>
      <Label>Close</Label>
    </Button>
    <Button on:click={downloadJSON(`${displayName}_metadata`, taxonomyTags)}>
      <Label>Download</Label>
    </Button>
  </div>
</Dialog>

<style>
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }
</style>
