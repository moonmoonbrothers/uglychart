<script lang="ts">
	import Widget from '../lib/Widget.svelte';
	import { Diagram, Node } from '@moonmoonbrothers/diagram';
	import {
		Alignment,
		Border,
		BorderSide,
		BoxDecoration,
		Column,
		Container,
		EdgeInsets,
		IntrinsicWidth,
		MainAxisAlignment,
		MainAxisSize,
		Row,
		SizedBox,
		Text,
		TextStyle
	} from '@moonmoonbrothers/flutterjs';

	function DBNode({
		columns,
		title
	}: {
		title: string;
		columns: {
			type: string;
			name: string;
		}[];
	}) {
		return Node(
			Container({
				decoration: new BoxDecoration({
					color: '#707070',
					border: Border.all({ color: 'black', width: 1 })
				}),
				child: IntrinsicWidth({
					child: Column({
						mainAxisSize: MainAxisSize.min,
						children: [
							Container({
								decoration: new BoxDecoration({
									color: '#505050',
									border: new Border({
										bottom: new BorderSide({
											color: 'black',
											width: 1
										})
									})
								}),
								padding: EdgeInsets.symmetric({ horizontal: 5, vertical: 2 }),
								child: Row({
									mainAxisAlignment: MainAxisAlignment.center,
									children: [
										Text(title, {
											style: new TextStyle({
												color: 'lightgrey',
												fontWeight: '800',
												fontFamily: 'Noto Sans KR, sans-serif'
											})
										})
									]
								})
							}),
							...columns.map(({ type, name }) =>
								Container({
									padding: EdgeInsets.only({ bottom: 2, left: 4, right: 4 }),
									child: Row({
										mainAxisAlignment: MainAxisAlignment.spaceBetween,
										children: [
											Text(name, {
												style: new TextStyle({
													fontSize: 14,
													fontWeight: '800',
													color: 'lightgrey',
													fontFamily: 'Noto Sans KR, sans-serif'
												})
											}),
											SizedBox({ width: 4 }),
											Text(type, {
												style: new TextStyle({
													fontSize: 12,
													fontWeight: '400',
													fontFamily: 'Noto Sans KR, sans-serif',
													color: '#a9a9a9'
												})
											})
										]
									})
								})
							)
						]
					})
				})
			})
		);
	}

	const postContent = DBNode({
		title: 'post_content',
		columns: [
			{
				type: 'uuid',
				name: 'post_id'
			},
			{
				type: 'jsonb',
				name: 'json'
			}
		]
	});
	const metaImage = DBNode({
		title: 'meta_image',
		columns: [
			{
				name: 'meta_id',
				type: 'uuid'
			},
			{
				name: 'category',
				type: 'smallint'
			},
			{
				name: 'url',
				type: 'varchar(2000)'
			},
			{
				name: 'seq',
				type: 'smallint'
			},
			{
				name: 'created_at',
				type: 'timestamp'
			},
			{
				name: 'updated_at',
				type: 'timestamp'
			}
		]
	});
	const metaContent = DBNode({
		title: 'meta_content',
		columns: [
			{
				type: 'uuid',
				name: 'meta_id'
			},
			{
				type: 'jsonb',
				name: 'json'
			}
		]
	});
	const post = DBNode({
		title: 'post',
		columns: [
			{
				name: 'space_id',
				type: 'uuid'
			},
			{
				name: 'state',
				type: 'smallint'
			},
			{
				name: 'slug',
				type: 'varchar(200)'
			},
			{
				name: 'title',
				type: 'varchar(200)'
			},
			{
				name: 'tags',
				type: 'varchar(300)'
			},
			{
				name: 'description',
				type: 'varchar(400)'
			},
			{
				name: 'created_at',
				type: 'timestamp'
			},
			{
				name: 'updated_at',
				type: 'timestamp'
			},
			{
				name: 'thumbnail',
				type: 'varchar(10000)'
			}
		]
	});

	const refreshRequest = DBNode({
		title: 'refresh_request',
		columns: [
			{
				name: 'space_id',
				type: 'uuid'
			},
			{
				name: 'source_type',
				type: 'smallint'
			},
			{
				name: 'page_id',
				type: 'uuid'
			},
			{
				name: 'type',
				type: 'smallint'
			},
			{
				name: 'state',
				type: 'smallint'
			},
			{
				name: 'created_at',
				type: 'timestamp'
			},
			{
				name: 'updated_at',
				type: 'timestamp'
			}
		]
	});
	const meta = DBNode({
		title: 'meta',
		columns: [
			{
				name: 'space_id',
				type: 'uuid'
			},
			{
				name: 'title',
				type: 'varchar(200)'
			},
			{
				name: 'updated_at',
				type: 'timestamp'
			}
		]
	});
	const space = DBNode({
		title: 'space',
		columns: [
			{
				name: 'uid',
				type: 'varchar(36)'
			},
			{
				name: 'slug',
				type: 'varchar(20)'
			},
			{
				name: 'meta_database_id',
				type: 'uuid'
			},
			{
				name: 'post_database_id',
				type: 'uuid'
			},
			{
				name: 'title',
				type: 'varchar(40)'
			},
			{
				name: 'state',
				type: 'smallint'
			},
			{
				name: 'created_at',
				type: 'timestamp'
			},
			{
				name: 'updated_at',
				type: 'timestamp'
			},
			{
				name: 'last_refreshed_at',
				type: 'timestamp'
			}
		]
	});
	space.addChildNode(post);
	space.addChildNode(refreshRequest);
	space.addChildNode(meta);
	post.addChildNode(postContent);
	meta.addChildNode(metaImage);
	meta.addChildNode(metaContent);
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Widget
	ssrSize={{ width: 1000, height: 3000 }}
	height="3000px"
	width="1000px"
	widget={Diagram({
		node: space
	})}
/>
