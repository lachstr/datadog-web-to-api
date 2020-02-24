$(function()
{
	var emptyOutputMsg = "API Json will appear here";
	var formattedEmptyOutputMsg = '<span style="color: #777;">'+emptyOutputMsg+'</span>';

	// Hides placeholder text
	$('#input').on('focus', function() {
		if (!$(this).val())
			$('#output').html(formattedEmptyOutputMsg);
	});

	// Shows placeholder text
	$('#input').on('blur', function() {
		if (!$(this).val())
			$('#output').html(formattedEmptyOutputMsg);
	}).blur();

	// Automatically do the conversion
	$('#input').keyup(function()
	{
		var input = $(this).val();
		if (!input)
		{
			$('#output').html(formattedEmptyOutputMsg);
			return;
		}

		try {
			var output = jsonConv(input);
			if (output) {
				$('#output').html(output);
			}
		} catch (e) {
			$('#output').html(e);
		}
	});

	// Highlights the output for the user
	$('#output').click(function()
	{
		if (document.selection)
		{
			var range = document.body.createTextRange();
			range.moveToElementText(this);
			range.select();
		}
		else if (window.getSelection)
		{
			var range = document.createRange();
			range.selectNode(this);
			var sel = window.getSelection();
			sel.removeAllRanges(); // Required as of Chrome 58: https://www.chromestatus.com/features/6680566019653632
			sel.addRange(range);
		}
	});

	// Fill in examples
	$('#example1').click(function() {
		$('#input').val(`{
    "viz": "timeseries",
    "requests": [
        {
            "q": "avg:system.cpu.iowait{role:example-cluster}",
            "type": "area",
            "style": {
                "palette": "orange",
                "type": "solid",
                "width": "thin"
            }
        },
        {
            "q": "100-week_before(avg:system.cpu.idle{role:examples-cluster})",
            "type": "line",
            "style": {
                "palette": "grey",
                "type": "dashed",
                "width": "thin"
            }
        }
    ],
    "markers": [
        {
            "value": "y < 100",
            "type": "info solid"
        }
    ]
}`).keyup();
	});

});
