import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Flex, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import EditToolbar from './EditToolbar';
import { postMetadataUpdate } from '../lib/metadataUtils';
import { readDict } from '../lib/metadataUtils';
import isUrl from 'is-url';

const DEBOUNCE_MS = 700;

export default (props) => {
  const signedIn = props.signedIn;
  // blocks read from all metadata, which is meh but ok
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  let content = readDict(props.metadata, props.id);
  const [text, setText] = useState(content ? content.text : '');
  const [link, setLink] = useState(content ? content.link : '');
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);
  const [debouncedLink] = useDebounce(link, DEBOUNCE_MS);

  useEffect(() => {
    const value = {
      link: debouncedLink,
      text: debouncedText,
    };
    syncUpdates(value);
  }, [debouncedText, debouncedLink]);

  const syncUpdates = async function (value) {
    try {
      await postMetadataUpdate(props.id, value, props.customerId, props.username);
      // TODO: handle errors
      // setText(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="block">
      <>
        <Flex
          onClick={() => {
            if (content && props.hideToolbar) {
              window.location.assign(content.url as string);
            } else {
              setEditing(true);
            }
          }}
          sx={{
            pl: 2,
            pr: 1,
            py: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 4,
            bg: 'text',
            color: 'background',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ flexGrow: 1, py: 1 }}>
            <Input
              ref={inputRef}
              variant="linkInput"
              sx={{ pointerEvents: props.hideToolbar ? 'none' : 'auto' }}
              defaultValue={content ? content.text : 'Link text'}
              onChange={(t) => {
                setText(t.target.value);
              }}
            />
          </Box>
          <Flex>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
              <path
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"
                fill="white"
              ></path>
            </svg>
          </Flex>
        </Flex>
        {editing && !props.hideToolbar && (
          <Box sx={{ p: 1, bg: 'lightGray' }}>
            <Input
              ref={inputRef}
              type="url"
              variant="linkInput"
              defaultValue={link}
              placeholder="Link url"
              sx={{}}
              onChange={(t) => {
                const val = t.target.value;
                if (isUrl(val)) {
                  setLink(val);
                }
              }}
            ></Input>
          </Box>
        )}
      </>
      {signedIn && !props.hideToolbar && (
        <EditToolbar
          editing={editing}
          onDelete={props.onDelete}
          hideDown={props.hideDown}
          hideUp={props.hideUp}
          onUp={props.onUp}
          onDown={props.onDown}
          onSwitchEditing={() => {
            setEditing(!editing);
            if (inputRef.current) {
              if (!editing) {
                inputRef.current.focus();
              } else {
                inputRef.current.blur();
              }
            }
          }}
        />
      )}
    </Card>
  );
};