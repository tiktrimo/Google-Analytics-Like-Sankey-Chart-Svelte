export default function cx(...args: (string | boolean)[]) {
	return args.filter(Boolean).join(' ');
}
